import JWTLib from "../libs/jwt-lib.js";

export default class Authorize {
  static async authorized(req, res, next) {
    try {
      const { authorization } = req.headers;
      req.userInfo = await JWTLib.verifyUserToken(authorization);
      next();
    } catch (e) {
      res.status(401).send({ message: e.message });
    }
  }

  static async isAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      const userInfo = await JWTLib.verifyUserToken(authorization);

      if (userInfo.role === "admin") {
        next();
      }
    } catch (e) {
      next(e.message);
    }
  }
  static async isSeller(req, res, next) {
    try {
      if (req.userInfo.role === "seller") {
        next();
      } else {
        res.status(403).send({ error: "You are not a seller" })
      }
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  }
}
