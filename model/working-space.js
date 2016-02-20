'use strict';

const vec = require('../utils/vector');

const SCALE_STEP = 1.2;

// center / scale - offset = center / newScale - newOffset
// newOffset = center / newScale - center / scale + offset = center * (1 / newScale - 1 / scale) + offset

module.exports = {
	actions: {
		setContentSize: data => value => {
			return { contentSize: value };
		},
		changeScale: data => (amount, center) => {
			let scale = data.scale;

			let newScale = scale * Math.pow(SCALE_STEP, amount);
			let newOffset = vec.add(vec.scale(center, (1 / newScale - 1 / scale)), data.offset);

			return { scale: newScale, offset: newOffset };
		},
		move: data => delta => {
			return { offset: vec.add(data.offset, vec.scale(delta, 1.0 / data.scale)) };
		}
	},
	data: {
		contentSize: vec(0, 0),
		scale: 1,
		offset: vec(0, 0)
	}
};