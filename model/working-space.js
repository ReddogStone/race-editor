'use strict';

const vec = require('../utils/vector');

const SCALE_STEP = 1.1;

module.exports = {
	actions: {
		setContentSize: data => value => {
			return { contentSize: value };
		},
		changeScale: data => amount => {
			return { scale: data.scale * Math.pow(SCALE_STEP, amount) };
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