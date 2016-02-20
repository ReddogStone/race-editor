'use strict';

let Store = require('../utils/store');
let contentSizeStore = require('../store/content-size');
let scaleStore = require('../store/scale');
let offsetStore = require('../store/offset');

exports.setContentSize = function(width, height) {
	return Store.transaction(function(set) {
		set(contentSizeStore, { width: width, height: height });
	});
};

exports.move = function(delta) {
	return Store.transaction(function(set) {
		let offset = offsetStore._value;
		let scale = scaleStore._value;
		set(offsetStore, { x: offset.x + delta.x / scale, y: offset.y + delta.y / scale });
	});
};

exports.changeScale = function(amount) {
	return Store.transaction(function(set) {
		set(scaleStore, scaleStore._value * Math.pow(1.1, amount));
	});
};
