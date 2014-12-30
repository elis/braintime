var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/templates/index.html');
});
app.use('/components', express.static(__dirname + '/bower_components'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('do', function (data) {
  	console.log('socket do:', data);
  })
});

var neuron = function (options) {
	var settings = {
		input: [],
		output: [],
		shortTerm: [],
		longTerm: [],
		processing: []
	}
};

neuron.prototype.input = function (inputId, data) {
	// do something
}

neuron.prototype.process = function (data) {
	// do something
}

neuron.prototype.output = function (outputId, data) {
	// do something
}

