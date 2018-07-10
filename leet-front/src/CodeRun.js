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
      fulldiv: '',
      fulloutput: '',
		}
		this.socket = io(this.state.socketAddr);
		this.runCode = this.runCode.bind(this);
		this.initializeSharedb = this.initializeSharedb.bind(this);
		this.initializeSocket = this.initializeSocket.bind(this);
    this.showFull = this.showFull.bind(this);
    this.showFullOutput = this.showFullOutput.bind(this);
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
                          {['javascript', 'python', 'ruby', 'java', 'scala', 'cpp', 'elixir', 'raw']
                            .map((language,i) => <option key={i}>{language}</option>)}
                        </select>
                        <select id="dataStructure">
                          {['array', 'tree', 'linked_list', 'raw']
                            .map((ds,i) => <option key={i}>{ds}</option>)}
                        </select>
                        <button onClick={this.runCode}>Run</button>
                      </div>
                      <div>
                        <textarea className={'collabta'}></textarea>
                      </div>
                      <div className={'results'}>
                          <fieldset className={'upper'}>
                            <legend>output</legend>
                            <div className={`wrapper ${this.state.fulloutput}`} onClick={this.showFullOutput}><pre className={'output'}></pre></div>
                          </fieldset>
                          <fieldset className={'down'}>
                            <legend>graph</legend>
                            <div className={`graph ${this.state.fulldiv}`} onClick={this.showFull}></div>
                          </fieldset>
                          
                      </div>
                    </div>)
    }


    runCode() {
      const type = document.querySelector('#dataStructure').value
      const code = document.querySelector('textarea').value
      const lang = document.querySelector('#language').value
      if (type === 'raw') {
        request.post(this.state.vizRenderAddr, {'type': type, 'val': code})
              .then(res => {
                  this.socket.emit('code running', {console: code, graph: res.body.result})
                  document.querySelector('.graph').innerHTML = res.body.result;
              });
        return
      }
      if (lang === 'raw') {
        document.querySelector(".output").innerHTML = code;
        request.post(this.state.vizRenderAddr, {'type': type, 'val': code.replace(/(?:\r\n|\r|\n)/g, '')})
              .then(res => {
                  this.socket.emit('code running', {console: code, graph: res.body.result})
                  document.querySelector('.graph').innerHTML = res.body.result;
              });
        return
      }
      
      request.post(this.state.codeRunUrl, {
        lang: lang, 
        code: document.querySelector('textarea').value
      }).then(response =>  {
        const results = response.body.stdout
        if (results) {
          document.querySelector(".output").innerHTML = results;
          // var display_type = document.querySelector('#type').value;
          request.post(this.state.vizRenderAddr, {'type': type, 'val': results})
              .then(res => {
                  this.socket.emit('code running', {console: results, graph: res.body.result})
                  document.querySelector('.graph').innerHTML = res.body.result;
              });
        } else {
          document.querySelector('.output').innerHTML = response.body.stderr;
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

    showFullOutput() {
      this.setState({
        fulloutput: this.state.fulloutput.length === 0 ? 'fulldiv' : ''
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
  		    document.querySelector('.output').innerHTML = data.console;
  		    document.querySelector('.graph').innerHTML = data.graph;
  		})
    }
}
