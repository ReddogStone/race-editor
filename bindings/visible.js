'use strict';

const vec = require('../utils/vector');

function inside(point, rect) {
	let relative = vec.sub(point, rect.topLeft);
	return (relative.x >= 0) && (relative.y >= 0) && (relative.x <= rect.size.x) && (relative.y <= rect.size.y);
}

module.exports = {
	visibleRect: function(contentSize, scale, offset) {
		return { topLeft: vec.neg(offset), size: vec.scale(contentSize, 1 / scale) };
	},
	visibleObjects: function(visibleRect, objects) {
		return objects.filter(object => inside(object.pos, visibleRect));
	}
};
