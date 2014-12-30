var events = require('events');

/**
 * Processes information on demand
 * @param {Array}
 * @param {Array}
 */
var Brain = module.exports = function (inputs, outputs) {
	var Neuron = require('./neuron');
	var t = events.EventEmitter.call(this);

	if (!inputs || !inputs.length || !outputs || !outputs.length) {
		return;
	}

	this.mappedInputs = inputs.map(function (current, index) {
		// console.log('Input:', current, index);
		return new Neuron({
			inputs: current
		});
	});

	this.mappedOutputs = outputs.map(function (current, index) {
		// console.log('output:', current, index);
		return new Neuron({
			outputs: current
		});
	});
};

Brain.prototype.__proto__ = events.EventEmitter.prototype;

Brain.prototype.signal = function (fromId, value) {
	if (this.mappedInputs.length < fromId) {
		return "No neuron connected to inputId "+fromId;
	}

	console.log('Received signal from:', fromId, 'with value:', value);

	this.mappedInputs[fromId].input(value);
}

