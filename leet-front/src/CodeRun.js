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
			codeRunUrl: process.env.REACT_APP_CODE_RUNNER
		}
		this.socket = io(this.state.socketAddr);
		this.runCode = this.runCode.bind(this);
		this.initializeSharedb = this.initializeSharedb.bind(this);
		this.initializeSocket = this.initializeSocket.bind(this);
	}

	componentDidMount() {
		this.initializeSharedb();
		this.initializeSocket();
    }

    render() {
    	return (<div className={'container'}>
                      <div>
                        <select id="language"><option>javascript</option><option>python</option><option>ruby</option><option>java</option></select>
                        <select id="dataStructure"><option>array</option><option>tree</option><option>linked_list</option><option>raw</option></select>
                        <button onClick={this.runCode}>Run</button>
                      </div>
                      <div>
                        <textarea className={'collabta'}></textarea>
                      </div>
                      <div className={'results'}>
                          <div className={'upper'}>output</div>
                          <div className={'down'}>graph</div>
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
