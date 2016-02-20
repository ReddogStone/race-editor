'use strict';

let storage = {};
let actions = {};

const Store = require('../../framework/store');

const Model = require('../../framework/model')(storage, actions);
const Binding = require('../../framework/binding')(storage);
const Component = require('../../framework/component')(storage, actions);

function init() {
	window.$ = require('../../3rdparty/jquery-2.2.0');

	const gridCanvas = $('#grid-canvas')[0];
	const objectCanvas = $('#object-canvas')[0];

	Model(require('../../model/working-space'));
	Model(require('../../model/level'));

	Binding(require('../../bindings/visible'));
	Binding(require('../../bindings/grid'));

	Component(require('./components/window')(gridCanvas));
	Component(require('./components/grid')(gridCanvas, objectCanvas));
	Component(require('./components/object-display')(gridCanvas));
}
