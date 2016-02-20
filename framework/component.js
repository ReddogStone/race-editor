'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

let registry = new Map();

module.exports = store => (adapter, view) => {
	let action = func => (...params) => {
		let changes = func(...params);

		changes.forEach(function(change) {
			let setter = registry.get(change);
			if (setter) {
				setter(...change._value);
			}
		});
	}

	let wrappedView = function(handlers) {
		let wrappedHandlers = {};
		for (let key in handlers) {
			wrappedHandlers[key] = action(handlers[key]);
		}
		return view(wrappedHandlers);
	};

	let bindings = adapter(wrappedView);
	for (let name in bindings) {
		let setter = bindings[name];
		let argNames = parseArgs(setter);
		let sources = argNames.map(argName => store[argName]);
		registry.set(Store.dependent(sources, (...params) => params, name), setter);
	}

	registry.forEach(function(setter, source) {
		setter(...source._value);
	});
}
