'use strict';

const vec = require('../../../../utils/vector');

module.exports = canvas => handlers => {
	window.addEventListener('resize', function(event) {
		handlers.setContentSize(vec(canvas.clientWidth, canvas.clientHeight));
	}, false);

	handlers.setContentSize(vec(canvas.clientWidth, canvas.clientHeight));
};
