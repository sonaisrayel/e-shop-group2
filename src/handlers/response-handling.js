import HttpStatusCodes from "http-status-codes";

export default class ResponseHandler {
  static handleListResponse(res, data) {
    return res.status(HttpStatusCodes.OK).send(data);
  }

  static handleGetResponse(res, data) {
    return res.status(HttpStatusCodes.OK).send(data);
  }

  static handlePostResponse(res, data) {
    return res.status(HttpStatusCodes.CREATED).send(data);
  }

  static handleDeleteResponse(res, data) {
    return res.status(HttpStatusCodes.ACCEPTED).send(data);
  }

  static handleUpdateResponse(res, data) {
    return res.status(HttpStatusCodes.ACCEPTED).send(data);
  }
}
