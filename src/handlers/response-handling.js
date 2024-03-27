export default class ResponseHandler {
  static handleListResponse(res, data) {
    return res.status(200).send(data);
  }

  static handleGetResponse(res, data) {
    return res.status(200).send(data);
  }

  static handlePostResponse(res, data) {
    return res.status(201).send(data);
  }

  static handleDeleteResponse(res, data) {
    return res.status(202).send(data);
  }

  static handleUpdateResponse(res, data) {
    return res.status(202).send(data);
  }
}
