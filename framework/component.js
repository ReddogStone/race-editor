'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = function(storage, actions) {
	let registry = new Map();

	return function(view) {
		for (let key in view) {
			if (key === 'attach') {
				let attach = view[key];
				let storeNames = parseArgs(attach);
				let storeAccessors = storeNames.map(storeName => () => storage[storeName]._value);

				let handler = attach(...storeAccessors);

				let actionNames = parseArgs(handler);
				let actionHandlers = actionNames.map(actionName => (...params) => {
					let changedStates = actions[actionName](...params);
					
					let changes = Store.propagate(changedStates);
					changes.forEach(function(change) {
						let setter = registry.get(change);
						if (setter) {
							setter(...change._value);
						}
					});
				});

				handler(...actionHandlers);
			} else {
				let display = view[key];
				let storeNames = parseArgs(display);
				let sources = storeNames.map(storeName => storage[storeName]);
				registry.set(Store.dependent(sources, (...params) => params, key), display);
			}
		}

		registry.forEach(function(setter, source) {
			setter(...source._value);
		});
	};
}
