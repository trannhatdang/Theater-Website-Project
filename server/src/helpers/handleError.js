import pkg from "jsonwebtoken";
import { handleErrorResponse } from "./handleResponse.js";

const { TokenExpiredError, JsonWebTokenError } = pkg;

export const handleError = (err, req, res) => {
	if (err instanceof JsonWebTokenError) {
		err.code = 401;
	}
	else if (err instanceof TokenExpiredError) {
		err.code = 403;
	}

	console.log(err)
	res.status(err.code).json({
		code: err.code,
		stack: err.stack
	});
};

export class BadRequestError extends Error {
	constructor(message = "BadRequestError") {
		super(message);
		this.code = 400;
	}
}

export class UnAuthorizedError extends Error {
	constructor(message = "UnAuthorizedError") {
		super(message);
		this.code = 401;
	}
}

export class ForbiddenError extends Error {
	constructor(message = "ForbiddenError") {
		super(message);
		this.code = 403;
	}
}

export class NotFoundError extends Error {
	constructor(message = "NotFoundError") {
		super(message);
		this.code = 404;
	}
}

export class ConflictError extends Error {
	constructor(message = "ConflictError") {
		super(message);
		this.code = 409;
	}
}

export class UnprocessableContentError extends Error{
	constructor(message = "UnprocessableContent"){
		super(message);
		this.code = 422;
	}
}
