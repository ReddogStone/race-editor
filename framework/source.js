'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = storage => sources => {
	for (let name in sources) {
		let initialValue = sources[name];
		storage[name] = Store.source(initialValue, name);
	}
}
