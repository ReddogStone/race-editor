'use strict';

const Store = require('./store');
const parseArgs = require('../utils/arguments-parser');

module.exports = store => bindings => {
	for (let name in bindings) {
		let func = bindings[name];
		let argNames = parseArgs(func);
		let sources = argNames.map(argName => store[argName]);
		store[name] = Store.dependent(sources, func, name);
	}
}
