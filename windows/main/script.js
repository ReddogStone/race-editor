'use strict';

const Store = require('../../framework/store');
const Component = require('../../framework/component');
const Model = require('../../framework/model');

function registerComponent(path, adapterParams, viewParams) {
	let adapter = require(path + '/adapter')(...adapterParams);
	let view = require(path + '/view');
	if (viewParams) {
		view = view(...viewParams);
	}
	Component(adapter, view);
}

function init() {
	window.$ = require('../../3rdparty/jquery-2.2.0');

	const gridCanvas = $('#grid-canvas')[0];
	const workingSpaceModel = Model(require('../../model/working-space'));

	registerComponent('./components/grid', [workingSpaceModel], [gridCanvas]);
	registerComponent('./components/window', [workingSpaceModel]);
}
