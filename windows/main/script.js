'use strict';

let store = {};

const Store = require('../../framework/store');

const Component = require('../../framework/component')(store);
const Model = require('../../framework/model')(store);

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
	const objectCanvas = $('#object-canvas')[0];

	const workingSpaceModel = Model(require('../../model/working-space'));
	const levelModel = Model(require('../../model/level'));

	registerComponent('./components/window', [workingSpaceModel]);
	registerComponent('./components/grid', [workingSpaceModel], [gridCanvas, objectCanvas]);
	registerComponent('./components/object-display', [workingSpaceModel, levelModel], [gridCanvas, objectCanvas]);
}
