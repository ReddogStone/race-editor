'use strict';

const vec = require('../utils/vector');

module.exports = {
	moveObject: (objects, scale) => (object, delta) => {
		object.pos = vec.add(object.pos, vec.scale(delta, 1 / scale));
		return { objects: objects };
	}
};