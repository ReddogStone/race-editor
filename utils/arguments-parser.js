'use strict';

module.exports = function(func) {
	let params = func.toString().match(/\(([^\)]*)\)/)[1].trim();
	if (!params) {
		return [];
	}

	return params.split(/,\s*/);
};
