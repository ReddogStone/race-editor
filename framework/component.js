'use strict';

let registry = new Map();

module.exports = function(adapter, view) {
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

	adapter(wrappedView, function response(states, func) {
		registry.set(Store.dependent(states, (...params) => params), func);
	});

	registry.forEach(function(setter, store) {
		setter(...store._value);
	});
}
