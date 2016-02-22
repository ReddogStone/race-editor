'use strict';

const parseArgs = require('../utils/arguments-parser');

module.exports = (storage, actions) => dispatcher => {
	for (let key in dispatcher) {
		let action = dispatcher[key];
		let storeNames = parseArgs(action);

		actions[key] = function(...params) {
			let values = storeNames.map(storeName => storage[storeName]._value);

			let changes = action(...values)(...params);
			let changedSources = [];
			for (let key in changes) {
				let source = storage[key];
				source._set(changes[key]);
				changedSources.push(source);
			}
			return changedSources;
		};
	}
};
