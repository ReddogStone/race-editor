'use strict';

module.exports = (workingSpaceModel) => (View, response) => {
	let view = View({
		changeScale: workingSpaceModel.changeScale,
		move: workingSpaceModel.move,
	});

	return {
		displayGrid: view.display
	};
};