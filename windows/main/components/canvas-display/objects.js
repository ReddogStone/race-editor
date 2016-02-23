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
	visibleObjects.forEach(function(visible, object) {
		if (object === highlighted) {
			highlightedDisplayed = visible.displayed;
		} else {
			displayObject(context, visible.displayed, false);
		}
	});

	if (highlightedDisplayed) {
		displayObject(context, highlightedDisplayed, true);
	}
};

exports.calculateVisible = function(contentSize, scale, offset, objects) {
	let visibleRect = rect(vec.neg(offset), vec.scale(contentSize, 1 / scale));
	let visibleObjects = objects.filter(object => rect.inside(visibleRect, object.pos));
	return new Map(visibleObjects.map(function(object) {
		let pos = vec.scale(vec.add(object.pos, offset), scale);
		let size = vec.scale(vec(100, 100), scale);
		let boundingBox = rect(vec.sub(pos, vec.scale(vec(50, 50), scale)), size);
		return [object,	{ boundingBox: boundingBox, displayed: { pos: pos, size: size } }];
	}));
};

exports.getHighlighted = function(visibleObjects, point) {
	for (let entry of visibleObjects) {
		let object = entry[0];
		let visible = entry[1];
		if (rect.inside(visible.boundingBox, point)) {
			return object;
		}
	}
	return null;
};
