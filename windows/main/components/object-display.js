'use strict';

const vec = require('../../../utils/vector');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = function(canvas) {
	let context = canvas.getContext('2d');

	return {
		displayObjects: function(offset, scale, visibleObjects) {
			context.save();
			context.scale(scale, scale);
			context.translate(offset.x, offset.y);

			context.beginPath();
			visibleObjects.forEach(function(object) {
				context.arc(object.pos.x, object.pos.y, 50, 0, 2 * Math.PI);
			});

			context.restore();

			context.strokeStyle = 'black';
			context.lineWidth = 2;
			context.stroke();
		}
	};
};
