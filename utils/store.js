var nodes = [];
var currentTransaction = null;
var nextId = 0;

function derive(parent, func) {
	var cached;
	var node = makeNode(function deriveGetter(hot, available) {
		let parentValues = available.get(parent);
		if (parentValues) {
			let result = {
				value: cached
			};
			if (hot.has(parent)) {
				value = func.apply(null, parentValues);
				cached = value;
			}
			return result;
		}
	});
}

function merge(parents) {
	if (!Array.isArray(parents)) {
		parents = Array.prototype.slice.call(parents);
	}

	var node = makeNode(function mergeGetter(hot, available) {
		let parentValues = parents.map(parent => available.get(parent));
		let available = parentValues.every(values => !!values);
		let hot = parents.some(parent => hot.has(parent));

		if (available) {
			if (hot) {

			}
		}
	});
}

function makeNode(getter) {
	var handlers = [];

	return {
		private: { get: getter }
		notify: function(values) {
			handlers.forEach(function(handler) {
				handler.apply(null, values);
			});
		},
		interface: {
			on: function(handler) {
				handlers.push(handler);
			},
			derive: function(func) {
				return derive(getter);
			}
		}
	};
}

exports.state = function(initial) {
	var value = initial;

	var node = makeNode();

	var result = Object.create(node.interface);
	result.update = function(pattern) {
		for (let key in pattern) {
			value[key] = pattern[key];
		}
		currentTransaction(node.private, value);
	};
	result.set = function(newValue) {
		value = newValue;
		currentTransaction(node.private, value);
	};
	return result;
};

function propagate(valueMap) {
	let hot = new Set(valueMap.keys());
	let available = valueMap;
	let unknown = nodes.filter(node => !hot.has(node));

	let active = true;
	while (active) {
		active = false;
		for (let i = unknown.length - 1; i >= 0; i--) {
			let node = unknown[i];

			let result = node.get(hot, available);
			if (result) {
				available.set(node, result.values);
				if (result.hot) {
					hot.add(node);
				}
				unknown.splice(i, 1);
				active = true;
			}
		}
	}
}

exports.transaction = function(scope) {
	if (currentTransaction) {
		return scope();
	}

	let valueMap = new Map();
	currentTransaction = function(node, value) {
		valueMap.set(node, value);
	};
	scope();
	currentTransaction = null;

	propagate(valueMap);
};
