export const handleSuccessResponse = (
	code = 200,
	metaData = undefined,
	data = undefined,
) => {
	return {
		code,
		metaData,
		data
	};
};

export const handleErrorResponse = (
	code = 500,
	stack = null,
) => {
	return {
		code,
		stack,
	};
};
