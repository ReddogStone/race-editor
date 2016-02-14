'use strict';

let Store = require('../../../utils/store');

let contentSize = require('../../../store/content-size');
let scale = require('../../../store/scale');

let windowDispatcher = require('../../../dispatcher/window');

module.exports = function(canvas) {
	let context = canvas.getContext('2d');

	canvas.addEventListener('wheel', function(event) {
		windowDispatcher.changeScale(event.wheelDelta / 120);
	}, false);

	Store.merge(contentSize, scale).bind(function(contentSize, scale) {
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		let gridSize = scale;
		while (gridSize < 10) {
			gridSize *= 10;
		}
		while (gridSize > 100) {
			gridSize /= 10;
		}

		context.beginPath();
		for (var i = 0; i < canvas.width / gridSize; i++) {
			context.moveTo(i * gridSize, 0);
			context.lineTo(i * gridSize, canvas.height);
		}
		for (var i = 0; i < canvas.height / gridSize; i++) {
			context.moveTo(0, i * gridSize);
			context.lineTo(canvas.width, i * gridSize);
		}

		context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
		context.lineWidth = 1;
		context.stroke();
	});
};
