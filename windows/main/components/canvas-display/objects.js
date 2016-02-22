'use strict';

const vec = require('../../../../utils/vector');
const rect = require('../../../../utils/rectangle');

function displayObject(context, object, highlighted) {
	context.beginPath();
	context.arc(object.pos.x, object.pos.y, 0.5 * object.size.x, 0, 2 * Math.PI);

	context.fillStyle = 'lightgray';
	context.strokeStyle = highlighted ? 'blue' : 'black';
	context.lineWidth = highlighted ? 4 : 2;
	context.fill();
	context.stroke();
}

exports.display = function(context, visibleObjects, highlighted) {
	let highlightedDisplayed = null;
	visibleObjects.forEach(function(object) {
		if (object.object === highlighted) {
			highlightedDisplayed = object.displayed;
		} else {
			displayObject(context, object.displayed, false);
		}
	});

	if (highlightedDisplayed) {
		displayObject(context, highlightedDisplayed, true);
	}
};

exports.calculateVisible = function(contentSize, scale, offset, objects) {
	let visibleRect = rect(vec.neg(offset), vec.scale(contentSize, 1 / scale));
	let visibleObjects = objects.filter(object => rect.inside(visibleRect, object.pos));
	return visibleObjects.map(function(object) {
		let pos = vec.scale(vec.add(object.pos, offset), scale);
		let size = vec.scale(vec(100, 100), scale);
		return {
			object: object,
			boundingBox: rect(vec.sub(pos, vec.scale(vec(50, 50), scale)), size),
			displayed: { pos: pos, size: size }
		};
	});
};
