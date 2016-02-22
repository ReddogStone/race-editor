'use strict';

let vec = require('./vector');

function rect(topLeft, size) {
	return {
		topLeft: topLeft,
		size: size
	};
}

rect.inside = function(rect, point) {
	let relative = vec.sub(point, rect.topLeft);
	return (relative.x >= 0) && (relative.y >= 0) && (relative.x <= rect.size.x) && (relative.y <= rect.size.y);
}

module.exports = rect;