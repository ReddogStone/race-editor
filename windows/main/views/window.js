'use strict';

let windowDispatcher = require('../../../dispatcher/window');
let body = document.body;

windowDispatcher.setContentSize(body.clientWidth, body.clientHeight);

window.addEventListener('resize', function(event) {
	windowDispatcher.setContentSize(body.clientWidth, body.clientHeight);
}, false);