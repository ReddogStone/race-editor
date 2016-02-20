'use strict';

module.exports = (workingSpaceModel, levelModel) => (View, response) => {
	let view = View({
	});
	response([workingSpaceModel.offset, workingSpaceModel.scale, levelModel.objects], view.display);
};
