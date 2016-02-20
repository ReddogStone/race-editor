'use strict';

const Store = require('./store');

module.exports = function(model) {
	let result = {};
	let stores = {};

	for (let key in model.data) {
		result[key] = stores[key] = Store.source(model.data[key], key);
	}

	for (let key in model.actions) {
		result[key] = function(...params) {
			let data = {};
			for (let key in stores) {
				data[key] = stores[key]._value;
			}
			let changes = model.actions[key](data)(...params);
			let changedStores = [];
			for (let key in changes) {
				let store = stores[key];
				store._set(changes[key]);
				changedStores.push(store);
			}
			return Store.propagate(changedStores);
		};
	}

	return result;
};
