'use strict';

const vec = require('../utils/vector');

module.exports = {
	objects: [
		{ type: 'rectangle', pos: vec(300, 100), size: vec(100, 50) },
		{ type: 'circle', pos: vec(100, 100), radius: 100 },
	]
};
