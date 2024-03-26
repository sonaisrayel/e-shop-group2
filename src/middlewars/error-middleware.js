export default class ErrorMiddleware {
    static async customError(err, req, res, next) {
        res.status(500).send({ message: err });
    }
}