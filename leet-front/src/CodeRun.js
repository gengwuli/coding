/** @flow */
import * as React from 'react';

import request from 'superagent'

import io from 'socket.io-client'

import Connection from 'sharedb/lib/client'
import StringBinding from 'sharedb-string-binding'

export default class CodeRun extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			socketAddr: process.env.REACT_APP_SOCKET_BACKEND,
			sharedbAddr: process.env.REACT_APP_SHAREDB,
			vizRenderAddr: process.env.REACT_APP_TEMPLATE_RENDER,
			codeRunUrl: process.env.REACT_APP_CODE_RUNNER,
      fulldiv: ''
		}
		this.socket = io(this.state.socketAddr);
		this.runCode = this.runCode.bind(this);
		this.initializeSharedb = this.initializeSharedb.bind(this);
		this.initializeSocket = this.initializeSocket.bind(this);
    this.showFull = this.showFull.bind(this)
	}

	componentDidMount() {
		this.initializeSharedb();
		this.initializeSocket();
    document.querySelector('.collabta').onkeydown = function(e){
        if(e.keyCode===9 || e.which===9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
    }

    render() {
    	return (<div className={'container'}>
                      <div>
                        <select id="language">
                          {['javascript', 'python', 'ruby', 'java', 'scala', 'cpp', 'elixir']
                            .map(language => <option>{language}</option>)}
                        </select>
                        <select id="dataStructure">
                          {['array', 'tree', 'linked_list', 'raw']
                            .map(ds => <option>{ds}</option>)}
                        </select>
                        <button onClick={this.runCode}>Run</button>
                      </div>
                      <div>
                        <textarea className={'collabta'}></textarea>
                      </div>
                      <div className={'results'}>
                          <div className={'upper'}>output</div>
                          <div className={`down ${this.state.fulldiv}`} onClick={this.showFull}>graph</div>
                      </div>
                    </div>)
    }


    runCode() {
      request.post(this.state.codeRunUrl, {
        lang: document.querySelector('#language').value, 
        code: document.querySelector('textarea').value
      }).then(response =>  {
        const results = response.body.stdout
        if (results) {
          document.querySelector(".upper").innerHTML = results;
          // var display_type = document.querySelector('#type').value;
          request.post(this.state.vizRenderAddr, {'type': document.querySelector('#dataStructure').value, 'val': results})
              .then(res => {
                  this.socket.emit('code running', {console: results, graph: res.body.result})
                  document.querySelector('.down').innerHTML = res.body.result;
              });
        } else {
          document.querySelector('.upper').innerHTML = response.body.stderr;
          this.socket.emit('running code', {console: results, graph: ''})
        }
      }).catch(function(e) {
        console.log(e)
      })
    }

    showFull() {
      this.setState({
        fulldiv: this.state.fulldiv.length === 0 ? 'fulldiv' : ''
      })
    }

    initializeSharedb() {
    	// Open WebSocket connection to ShareDB server
		let socket = new WebSocket(this.state.sharedbAddr);
		let connection = new Connection.Connection(socket);

		// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
		let doc = connection.get('examples', 'textarea');
  		doc.subscribe(function(err) {
  		  if (err) throw err;
  		  let element = document.querySelector('textarea');
  		  let binding = new StringBinding(element, doc);
  		  binding.setup();
  		});
    }

    initializeSocket() {
  		this.socket.on('code finished', function(data) {
  		    document.querySelector('.upper').innerHTML = data.console;
  		    document.querySelector('.down').innerHTML = data.graph;
  		})
    }
}
