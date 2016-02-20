'use strict';

const vec = require('../utils/vector');

module.exports = {
	gridSize: scale => Math.pow(10, Math.floor(Math.log10(scale))),
};
