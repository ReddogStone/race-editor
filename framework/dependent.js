'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = storage => dependents => {
	for (let name in dependents) {
		let func = dependents[name];
		let argNames = parseArgs(func);
		let sources = argNames.map(argName => storage[argName]);
		storage[name] = Store.dependent(sources, func, name);
	}
}
