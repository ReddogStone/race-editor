'use strict';

module.exports = function(func) {
	let string = func.toString();
	let params = null;

	let match = string.match(/^\s*(\w+)\s*=>/);
	if (match) {
		params = match[1].trim();
	} else {
		match = string.match(/\(([^\)]*)\)/);
		if (match) {
			params = match[1].trim();
		}
	}

	if (!params) { return []; }

	return params.split(/,\s*/);
};
