'use strict';

const vec = require('../../../utils/vector');
const rect = require('../../../utils/rectangle');

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

module.exports = function(canvas) {
	let context = canvas.getContext('2d');

	let displayedObjects = [];
	let highlighted = null;

	function getHighlightedObject(point) {
		return displayedObjects.filter(object => rect.inside(object.boundingBox, point))[0];
	}

	function displayObject(context, offset, scale, object, color) {
		context.save();
		context.scale(scale, scale);
		context.translate(offset.x, offset.y);

		context.beginPath();
		context.arc(object.pos.x, object.pos.y, 50, 0, 2 * Math.PI);

		context.restore();

		context.fillStyle = 'lightgray';
		context.strokeStyle = color;
		context.lineWidth = 2;
		context.fill();
		context.stroke();
	}

	return {
		attach: (highlightedObject) => (moveObject, setHighlighted) => {
			let beginMove = null;
			let dragged = null;
			canvas.addEventListener('mousedown', function(event) {
				dragged = highlightedObject();
				if (dragged) {
					beginMove = getMousePos(canvas, event);
				}
			}, false);
			canvas.addEventListener('mousemove', function(event) {
				if (beginMove) {
					let pos = getMousePos(canvas, event);
					let delta = vec.sub(pos, beginMove);
					beginMove = pos;

					moveObject(dragged, delta);
				} else {
					let point = getMousePos(canvas, event);
					let highlighted = getHighlightedObject(point);
					setHighlighted(highlighted ? highlighted.object : null);
				}
			}, false);
			canvas.addEventListener('mouseup', function(event) {
				beginMove = null;
			}, false);
		},
		displayObjects: function(contentSize, offset, scale, visibleObjects, highlightedObject) {
			canvas.width = contentSize.x;
			canvas.height = contentSize.y;			

			visibleObjects.filter(object => highlightedObject !== object).forEach(function(object) {
				displayObject(context, offset, scale, object, 'black');
			});

			if (highlightedObject) {
				displayObject(context, offset, scale, highlightedObject, 'blue');
			}

			displayedObjects = visibleObjects.map(function(object) {
				return {
					object: object,
					boundingBox: rect(
						vec.scale(vec.add(vec.sub(object.pos, vec(50, 50)), offset), scale),
						vec.scale(vec(100, 100), scale)
					)
				};
			});
		}
	};
};
