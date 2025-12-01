import pkg from "jsonwebtoken";
const { TokenExpiredError, JsonWebTokenError } = pkg;
import { handleErrorResponse } from "./handleResponse.js";

export const handleError = (err, req, res, next) => {
  // const resErorr = {
  //     message: err.message,
  //     code: err.code,
  //     stack: err.stack,
  // };
  console.log(err);

  if (err instanceof JsonWebTokenError) {
    err.code = 401;
  }

  if (err instanceof TokenExpiredError) {
    err.code = 403;
  }

  const resError = handleErrorResponse(err.message, err.code, err.stack);
  res.status(resError.code).json(resError);
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
