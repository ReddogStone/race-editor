'use strict';

const vec = require('../../../../utils/vector');

exports.calculateSize = function(scale) {
	let gridSize = scale;
	while (gridSize < 10) {
		gridSize *= 10;
	}
	while (gridSize > 100) {
		gridSize /= 10;
	}
	return gridSize;
};

exports.display = (context, scale, offset, gridSize) => {
	let canvas = context.canvas;
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
};
