'use strict';

let Store = require('../../utils/store');

let registry = new Map();

function component(scope) {
	scope(
		function bind(states, func) {
			registry.set(Store.dependent(states, (...params) => params), func);
		},
		function action(func, ...params) {
			let changes = func(...params);
			changes.forEach(function(change) {
				let setter = registry.get(change);
				if (setter) {
					setter(...change._value);
				}
			});
		}
	);
}

function init() {
	window.$ = require('../../3rdparty/jquery-2.2.0');

	let gridCanvas = $('#grid-canvas')[0];
	component(require('./components/grid')(gridCanvas));

	component(require('./components/window'));
}