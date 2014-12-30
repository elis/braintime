var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/templates/index.html');
});
app.use('/components', express.static(__dirname + '/bower_components'));

var myBrain;
var mySocket;

var Brain = require('./modules/brain');


var myInputs = [];
var myOutputs = [];

myInputs.push(function (signal) {
	return this.process(signal);
});

myOutputs.push(function(signal) {
	console.log('received output signal:', signal);

	mySocket.emit('output1', signal);
	return true;
});

myBrain = new Brain(myInputs, myOutputs);

myBrain.on('outputSignal', function (value) {
	mySocket.emit('brainSignal', value);
});

io.on('connection', function (socket) { 
	mySocket = socket;
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('do', function (data, response) {
  	console.log('My Brain:', myBrain);
  	response(myBrain);
  });

  socket.on('valtest', function (data, response) {
  	console.log('Data from valtest:', data);
  	console.log('My brain:', myBrain);

  	myBrain.signal(0, data);
  });
});
