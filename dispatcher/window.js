'use strict';

let Store = require('../utils/store');
let contentSizeStore = require('../store/content-size');
let scaleStore = require('../store/scale');

exports.setContentSize = function(width, height) {
	Store.transaction(function() {
		contentSizeStore.set({ width: width, height: height });
	});
};

exports.changeScale = function(amount) {
	Store.transaction(function() {
		scaleStore.set(scaleStore.values[0] * Math.pow(1.1, amount));
	});
};
