export const handleSuccessResponse = (
	message = "Success",
	code = 200,
	metaData = null,
	data = null,
) => {
	return {
		status: `success`,
		message, //object literal
		code,
		metaData,
		data,
	};
};

export const handleErrorResponse = (
  message = "Internal Server Error",
  code = 500,
  stack = null,
) => {
  return {
    message,
    code,
    stack,
  };
};
