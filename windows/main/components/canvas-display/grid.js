'use strict';

const vec = require('../../../../utils/vector');

exports.calculateGeometry = function(scale, offset) {
	let gridSize = scale;
	while (gridSize < 10) {
		gridSize *= 10;
	}
	while (gridSize > 100) {
		gridSize /= 10;
	}
	return {
		size: gridSize,
		offset: vec.mod(vec.scale(offset, scale), gridSize)
	};
};

exports.display = function(context, gridGeometry) {
	let canvas = context.canvas;

	context.beginPath();
	for (let x = gridGeometry.offset.x; x < canvas.width; x += gridGeometry.size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}
	for (let y = gridGeometry.offset.y; y < canvas.height; y += gridGeometry.size) {
		context.moveTo(0, y);
		context.lineTo(canvas.width, y);
	}

	context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
	context.lineWidth = 1;
	context.stroke();
};

exports.positionOnGrid = function(gridGeometry, point) {
	let size = gridGeometry.size;
	let offset = gridGeometry.offset;
	let relativePos = vec.sub(point, offset);
	relativePos = vec.scale(vec.map(vec.scale(relativePos, 1 / size), Math.round), size);
	return vec.add(relativePos, offset);	
};
