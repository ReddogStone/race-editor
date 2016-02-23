'use strict';

const vec = require('../../../../utils/vector');
const rect = require('../../../../utils/rectangle');

const ObjectTypes = require('../../../../enums/object-types');

function objectPath(context, object) {
	switch (object.type) {
		case ObjectTypes.CIRCLE:
			context.beginPath();
			context.arc(object.pos.x, object.pos.y, object.radius, 0, 2 * Math.PI);
			break;
		case ObjectTypes.RECTANGLE:
			context.beginPath();
			context.rect(object.pos.x, object.pos.y, object.size.x, object.size.y);
			break;
	}
}

function displayObject(context, object, highlighted) {
	objectPath(context, object);

	context.fillStyle = 'lightgray';
	context.strokeStyle = highlighted ? 'blue' : 'black';
	context.lineWidth = highlighted ? 4 : 2;
	context.fill();
	context.stroke();
}

function toDisplayPoint(offset, scale, point) {
	return vec.scale(vec.add(point, offset), scale);
}

function toDisplayObject(offset, scale, object) {
	switch (object.type) {
		case ObjectTypes.CIRCLE:
			return {
				type: object.type,
				pos: toDisplayPoint(offset, scale, object.pos),
				radius: object.radius * scale
			};

		case ObjectTypes.RECTANGLE:
			return {
				type: object.type,
				pos: toDisplayPoint(offset, scale, object.pos),
				size: vec.scale(object.size, scale)
			};
	}
}

function getBoundingBox(displayed) {
	switch (displayed.type) {
		case ObjectTypes.CIRCLE:
			let radiusVec = vec.replicate(displayed.radius);
			return rect(vec.sub(displayed.pos, radiusVec), vec.scale(radiusVec, 2));

		case ObjectTypes.RECTANGLE:
			return rect(displayed.pos, displayed.size);
	}
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
		let displayed = toDisplayObject(offset, scale, object);
		let boundingBox = getBoundingBox(displayed);
		return [object,	{ boundingBox: boundingBox, displayed: displayed }];
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
