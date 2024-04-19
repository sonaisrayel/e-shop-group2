import HttpStatusCodes from "http-status-codes";

export const customError = (err, req, res, next) => {
  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
};
