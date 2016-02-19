'use strict';

let contentSizeStore = require('../../../store/content-size');
let scaleStore = require('../../../store/scale');
let offsetStore = require('../../../store/offset');

let windowDispatcher = require('../../../dispatcher/window');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = function(canvas) {
	return function(bind, action) {
		let context = canvas.getContext('2d');

		canvas.addEventListener('wheel', function(event) {
			action(windowDispatcher.changeScale, event.wheelDelta / 120);
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
				action(windowDispatcher.move, delta);
			}
		}, false);
		canvas.addEventListener('mouseup', function(event) {
			beginMove = null;
		}, false);

		bind([contentSizeStore, scaleStore, offsetStore], function(contentSize, scale, offset) {
			if (canvas.width !== canvas.clientWidth) canvas.width = canvas.clientWidth;
			if (canvas.height !== canvas.clientHeight) canvas.height = canvas.clientHeight;

			context.clearRect(0, 0, canvas.width, canvas.height);

			let gridSize = scale;
			while (gridSize < 10) {
				gridSize *= 10;
			}
			while (gridSize > 100) {
				gridSize /= 10;
			}

			let startX = (offset.x * scale) % gridSize;
			let startY = (offset.y * scale) % gridSize;

			context.beginPath();
			for (let x = startX; x < canvas.width; x += gridSize) {
				context.moveTo(x, 0);
				context.lineTo(x, canvas.height);
			}
			for (let y = startY; y < canvas.height; y += gridSize) {
				context.moveTo(0, y);
				context.lineTo(canvas.width, y);
			}

			context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
			context.lineWidth = 1;
			context.stroke();
		});
	};
};
