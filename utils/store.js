'use strict';

var nodes = [];
var currentTransaction = null;

function makeNode(parents, updateFunc) {
	let handlers = [];
	let initial = update();

	function update() {
		let parentValues = parents.map(parent => parent._values);
		if (parentValues.every(values => !!values)) {
			let values = updateFunc(parentValues);
		 	handlers.forEach(handler => handler.apply(null, values));
		 	return values;
		}
	}

	let node = {
		_values: initial,
		_parents: parents,

		_update: function() {
			node._values = update();
		},

		bind: function(handler) {
			handlers.push(handler);
			if (node._values) {
				handler.apply(null, node._values);
			}
		},

		derive: function(func) {
			return makeDerive(node, func);
		},
		filter: function(func) {
			return makeFilter(node, func);
		}
	};

	nodes.push(node);

	return node;
}

function makeDerive(parent, func) {
	return makeNode([parent], function deriveUpdate() {
		return [func.apply(null, parent._values)];
	});
}

function makeFilter(parent, func) {
	return makeNode([parent], function filterUpdate() {
		if (func.apply(null, parent._values)) {
			return parent._values;
		}
	});
}

function propagate(changedStates) {
	let hot = changedStates;
	let available = new Set(changedStates);
	let unknown = nodes.filter(node => !hot.has(node));

	let active = true;
	while (active) {
		active = false;
		for (let i = unknown.length - 1; i >= 0; i--) {
			let node = unknown[i];

			let parents = node._parents;

			let nodeAvailable = parents.every(parent => available.has(parent));
			let nodeHot = parents.some(parent => hot.has(parent));

			if (nodeAvailable) {
				if (nodeHot) {
					node._update(hot);
					hot.add(node);
				}
				available.add(node);

				unknown.splice(i, 1);
				active = true;
			}
		}
	}
}

exports.merge = function(parents) {
	if (!Array.isArray(parents)) {
		parents = Array.prototype.slice.call(arguments);
	}

	return makeNode(parents, function mergeUpdate() {
		let parentValues = parents.map(parent => parent._values);
		return parentValues.reduce((memo, next) => memo.concat(next));
	});
};

exports.dependent = function(parents, func) {
	return exports.merge(parents).derive(func);
};

exports.state = function(initial) {
	let value = initial;

	let result = makeNode([], function updateState() {
		return [value];
	});
	result.set = function(newValue) {
		value = newValue;
		result._update();
		currentTransaction(result);
	};
	result.update = function(pattern) {
		for (let key in pattern) {
			value[key] = pattern[key];
		}
		result._update();

		currentTransaction(result);
	};
	return result;
};

exports.list = function(initial) {
	let result = exports.state(initial);
	result.updateElement = function(index, pattern) {
		let element = result._values[0][index];
		for (let key in pattern) {
			element[key] = pattern[key];
		}
		result._update([]);
	};
	return result;
};

exports.transaction = function(scope) {
	if (currentTransaction) {
		return scope();
	}

	let changedStates = new Set();
	currentTransaction = function(node) {
		changedStates.add(node);
	};
	scope();
	currentTransaction = null;

	propagate(changedStates);
};
