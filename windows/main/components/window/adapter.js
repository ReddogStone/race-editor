'use strict';

module.exports = windowDispatcher => View => {
	let view = View({
		setContentSize: windowDispatcher.setContentSize,
	});
};