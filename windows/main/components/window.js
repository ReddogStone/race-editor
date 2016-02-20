'use strict';

const vec = require('../../../utils/vector');

module.exports = function(canvas) {
	return {
		attach: () => setContentSize => {
			window.addEventListener('resize', function(event) {
				setContentSize(vec(canvas.clientWidth, canvas.clientHeight));
			}, false);

			setContentSize(vec(canvas.clientWidth, canvas.clientHeight));
		}
	};
};
