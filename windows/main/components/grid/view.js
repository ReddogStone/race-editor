'use strict';

const vec = require('../../../../utils/vector');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = canvas => handlers => {
	canvas.addEventListener('wheel', function(event) {
		handlers.changeScale(event.wheelDelta / 120);
	}, false);

	let beginMove = null;
	canvas.addEventListener('mousedown', function(event) {
		beginMove = getMousePos(canvas, event);
	}, false);
	canvas.addEventListener('mousemove', function(event) {
		if (beginMove) {
			let pos = getMousePos(canvas, event);
			let delta = { x: pos.x - beginMove.x, y: pos.y - beginMove.y };
			beginMove = pos;
			handlers.move(delta);
		}
	}, false);
	canvas.addEventListener('mouseup', function(event) {
		beginMove = null;
	}, false);

	let context = canvas.getContext('2d');

	return {
		display: function(contentSize, scale, offset) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;

			let gridSize = scale;
			while (gridSize < 10) {
				gridSize *= 10;
			}
			while (gridSize > 100) {
				gridSize /= 10;
			}

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
