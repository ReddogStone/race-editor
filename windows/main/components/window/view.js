'use strict';

module.exports = handlers => {
	let body = document.body;
	
	window.addEventListener('resize', function(event) {
		handlers.setContentSize(body.clientWidth, body.clientHeight);
	}, false);

	handlers.setContentSize(body.clientWidth, body.clientHeight);
};
