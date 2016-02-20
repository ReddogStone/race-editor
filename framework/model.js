'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = (storage, actions) => model => {
	for (let key in model.data) {
		storage[key] = Store.source(model.data[key], key);
	}

	for (let key in model.actions) {
		let action = model.actions[key];
		let storeNames = parseArgs(action);

		actions[key] = function(...params) {
			let data = {};

			let values = storeNames.map(storeName => storage[storeName]._value);

			let changes = action(...values)(...params);
			let changedSources = [];
			for (let key in changes) {
				let source = storage[key];
				source._set(changes[key]);
				changedSources.push(source);
			}
			return Store.propagate(changedSources);
		};
	}
};
