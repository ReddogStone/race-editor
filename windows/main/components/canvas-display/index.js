'use strict';

const vec = require('../../../../utils/vector');
const rect = require('../../../../utils/rectangle');

const Grid = require('./grid');
const Objects = require('./objects');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = function(canvas) {
	let context = canvas.getContext('2d');

	let gridSize = 10;
	let visibleObjects = [];

	return {
		attach: (highlightedObject) => (moveContent, moveObject, changeScale, setHighlighted) => {
			canvas.addEventListener('wheel', function(event) {
				changeScale(event.wheelDelta / 120, getMousePos(canvas, event));
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

					let highlighted = highlightedObject();
					if (highlighted) {
						moveObject(highlighted, delta);
					} else {
						moveContent(delta);
					}
				} else {
					let point = getMousePos(canvas, event);
					setHighlighted(Objects.getHighlighted(visibleObjects, point));
				}
			}, false);
			canvas.addEventListener('mouseup', function(event) {
				beginMove = null;
			}, false);
		},
		displayCanvas: function(contentSize, scale, offset, objects, highlightedObject) {
			canvas.width = contentSize.x;
			canvas.height = contentSize.y;

			gridSize = Grid.calculateSize(scale);
			Grid.display(context, scale, offset, gridSize);

			visibleObjects = Objects.calculateVisible(contentSize, scale, offset, objects);
			Objects.display(context, visibleObjects, highlightedObject);
		}
	};
};
