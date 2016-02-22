'use strict';

const vec = require('../utils/vector');

module.exports = {
	setHighlighted: () => (object) => {
		return { highlightedObject: object };
	}
};
