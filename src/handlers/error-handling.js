export const notFoundError = (res, message) => {
  res.status(404).send(message);
};

export const validationError = (res, message) => {
  res.status(403).send(message);
};

export const duplicateError = (res, message) => {
  res.status(409).send(message);
};
