'use strict';

const vec = require('../../../../utils/vector');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = (canvas, eventSource) => handlers => {
	eventSource.addEventListener('wheel', function(event) {
		handlers.changeScale(event.wheelDelta / 120, getMousePos(eventSource, event));
	}, false);

	let beginMove = null;
	eventSource.addEventListener('mousedown', function(event) {
		beginMove = getMousePos(eventSource, event);
	}, false);
	eventSource.addEventListener('mousemove', function(event) {
		if (beginMove) {
			let pos = getMousePos(eventSource, event);
			let delta = { x: pos.x - beginMove.x, y: pos.y - beginMove.y };
			beginMove = pos;
			handlers.move(delta);
		}
	}, false);
	eventSource.addEventListener('mouseup', function(event) {
		beginMove = null;
	}, false);

	let context = canvas.getContext('2d');

	return {
		display: function(contentSize, scale, offset, gridSize) {
			canvas.width = contentSize.x;
			canvas.height = contentSize.y;

			let start = vec.mod(vec.scale(offset, scale), gridSize);

			context.beginPath();
			for (let x = start.x; x < canvas.width; x += gridSize) {
				context.moveTo(x, 0);
				context.lineTo(x, canvas.height);
			}
			for (let y = start.y; y < canvas.height; y += gridSize) {
				context.moveTo(0, y);
				context.lineTo(canvas.width, y);
			}

			context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
			context.lineWidth = 1;
			context.stroke();			
		}
	};
};
