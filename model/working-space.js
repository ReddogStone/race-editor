'use strict';

const vec = require('../utils/vector');

const SCALE_STEP = 1.2;

module.exports = {
	actions: {
		setContentSize: () => value => {
			return { contentSize: value };
		},
		changeScale: (scale, offset) => (amount, center) => {
			let newScale = scale * Math.pow(SCALE_STEP, amount);
			let newOffset = vec.add(vec.scale(center, (1 / newScale - 1 / scale)), offset);

			return { scale: newScale, offset: newOffset };
		},
		moveContent: (scale, offset) => delta => {
			return { offset: vec.add(offset, vec.scale(delta, 1.0 / scale)) };
		}
	},
	data: {
		contentSize: vec(0, 0),
		scale: 1,
		offset: vec(0, 0)
	}
};