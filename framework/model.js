'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = store => model => {
	let result = {};

	for (let key in model.data) {
		store[key] = Store.source(model.data[key], key);
	}

	for (let key in model.actions) {
		let action = model.actions[key];
		let argNames = parseArgs(action);
		result[key] = function(...params) {
			let data = {};

			let values = argNames.map(argName => store[argName]._value);

			let changes = action(...values)(...params);
			let changedSources = [];
			for (let key in changes) {
				let source = store[key];
				source._set(changes[key]);
				changedSources.push(source);
			}
			return Store.propagate(changedSources);
		};
	}

	return result;
};
