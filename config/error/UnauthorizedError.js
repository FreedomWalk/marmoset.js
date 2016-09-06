/**
 * Created by bournewang on 16/8/9.
 */
'use strict';

class UnauthorizedError extends Error {

  constructor(code, error) {
    super(error);
    this.name = 'UnauthorizedError';
    this.message = error.message;
    this.code = code;
    this.status = 401;
    this.inner = error;
  }
}

module.exports = UnauthorizedError;
