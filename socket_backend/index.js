var http = require('http');
var express = require('express');

startServer();

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    var app = express();
    app.use(express.static('static'));
    var server = http.createServer(app);
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('connected');
        socket.on('needUpdate', function(data) {
            socket.broadcast.emit('update', data);
        });

        socket.on('code running', function(data) {
            socket.broadcast.emit('code finished', data)
        })
        
    })

    server.listen(8080);
    console.log('Listening on http://localhost:8080');
}

