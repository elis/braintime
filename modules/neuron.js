var events = require('events');
/**
 * Process signal on demand
 * @param {[type]}
 */
var Neuron = module.exports = function (options) {
	events.EventEmitter.call(this);
	var settings = {
		input: [],
		output: [],
		shortTerm: [],
		longTerm: [],
		processing: []
	}
};

Neuron.prototype.__proto__ = events.EventEmitter.prototype;

Neuron.prototype.input = function (inputId, data) {
	// do something
	this.process(inputId, data);
}

Neuron.prototype.process = function (inputId, data) {
	// do something
	this.output(0, data*0.8);
}

Neuron.prototype.output = function (outputId, data) {
	// do something
}

