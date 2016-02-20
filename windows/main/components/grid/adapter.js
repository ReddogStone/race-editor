'use strict';

module.exports = (workingSpaceModel) => (View, response) => {
	let view = View({
		changeScale: workingSpaceModel.changeScale,
		move: workingSpaceModel.move,
	});
	response([workingSpaceModel.contentSize, workingSpaceModel.scale, workingSpaceModel.offset], view.display);
};