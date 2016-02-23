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

	let gridGeometry = { size: 10, offset: vec(0, 0) };
	let visibleObjects = new Map();
	let highlighted = null;

	function display() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		Grid.display(context, gridGeometry);
		Objects.display(context, visibleObjects, highlighted);
	}

	return {
		attach: () => (moveContent, moveObject, changeScale) => {
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
					let delta = vec.sub(pos, beginMove);

					if (highlighted) {
						let displayed = visibleObjects.get(highlighted).displayed;
						let curPos = displayed.pos;
						let newPos = Grid.positionOnGrid(gridGeometry, vec.add(curPos, delta));
						let usedDelta = vec.sub(newPos, curPos);

						if (!vec.eq(usedDelta, vec(0, 0))) {
							beginMove = vec.add(beginMove, usedDelta);
							moveObject(highlighted, usedDelta);
						}
					} else {
						beginMove = pos;
						moveContent(delta);
					}
				} else {
					let point = getMousePos(canvas, event);
					let newHighlighted = Objects.getHighlighted(visibleObjects, point);
					if (newHighlighted !== highlighted) {
						highlighted = newHighlighted;
						display();
					}
				}
			}, false);
			canvas.addEventListener('mouseup', function(event) {
				beginMove = null;
			}, false);
		},
		displayCanvas: function(contentSize, scale, offset, objects) {
			canvas.width = contentSize.x;
			canvas.height = contentSize.y;

			gridGeometry = Grid.calculateGeometry(scale, offset);
			visibleObjects = Objects.calculateVisible(contentSize, scale, offset, objects);

			display();
		}
	};
};
