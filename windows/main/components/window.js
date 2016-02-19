'use strict';

let windowDispatcher = require('../../../dispatcher/window');

module.exports = function(bind, action) {
	let body = document.body;
	
	window.addEventListener('resize', function(event) {
		action(windowDispatcher.setContentSize, body.clientWidth, body.clientHeight);
	}, false);

	action(windowDispatcher.setContentSize, body.clientWidth, body.clientHeight);
};
