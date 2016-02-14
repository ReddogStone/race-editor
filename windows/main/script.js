'use strict';

function init() {
	window.$ = require('../../3rdparty/jquery-2.2.0');

	let gridCanvas = $('#grid-canvas')[0];
	require('./views/grid')(gridCanvas);

	require('./views/window');
}