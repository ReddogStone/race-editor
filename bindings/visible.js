const vec = require('../utils/vector');

module.exports = workingSpaceModel => binding => {
	return {
		visibleRect: binding(
			[workingSpaceModel.contentSize, workingSpaceModel.scale, workingSpaceModel.offset],
			(contentSize, scale, offset) => 
		)
	};
};
