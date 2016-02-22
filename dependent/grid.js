'use strict';

const vec = require('../utils/vector');

module.exports = {
	gridSize: function(scale) {
		let gridSize = scale;
		while (gridSize < 10) {
			gridSize *= 10;
		}
		while (gridSize > 100) {
			gridSize /= 10;
		}
		return gridSize;
	},
};
