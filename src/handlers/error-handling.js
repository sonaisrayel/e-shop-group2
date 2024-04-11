import HttpStatusCodes from 'http-status-codes';

export const notFoundError = (res, message) => {
  res.status(HttpStatusCodes.NOT_FOUND).send(message);
};

export const validationError = (res, message) => {
  res.status(HttpStatusCodes.FORBIDDEN).send(message);
};

export const duplicateError = (res, message) => {
  res.status(HttpStatusCodes.CONFLICT).send(message);
};
