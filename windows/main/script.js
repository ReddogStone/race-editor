'use strict';

let storage = {};
let actions = {};

require('../../utils/math-utils');

const Store = require('../../framework/store');

const Dispatcher = require('../../framework/dispatcher')(storage, actions);
const Source = require('../../framework/source')(storage);
const Dependent = require('../../framework/dependent')(storage);
const Component = require('../../framework/component')(storage, actions);

function init() {
	window.$ = require('../../3rdparty/jquery-2.2.0');

	const gridCanvas = $('#grid-canvas')[0];
	const objectCanvas = $('#object-canvas')[0];

	Source(require('../../source/level'));
	Source(require('../../source/working-space'));
	Source(require('../../source/editing'));

	Dependent(require('../../dependent/visible'));
	Dependent(require('../../dependent/grid'));

	Dispatcher(require('../../dispatcher/working-space'));
	Dispatcher(require('../../dispatcher/level'));
	Dispatcher(require('../../dispatcher/editing'));

	Component(require('./components/window')(objectCanvas));
	Component(require('./components/canvas-display')(objectCanvas));
}
