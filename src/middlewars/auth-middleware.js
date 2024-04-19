import HttpStatusCodes from "http-status-codes";
import JWTLib from "../libs/jwt-lib.js";
import { validationError } from "../handlers/error-handling.js";

export default class Authorize {
  static async authorized(req, res, next) {
    try {
      const { authorization } = req.headers;
      req.userInfo = await JWTLib.verifyUserToken(authorization);
      next();
    } catch (e) {
      res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: e.message });
    }
  }

  static async isAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;
      const userInfo = await JWTLib.verifyUserToken(authorization);
      if (userInfo.role === "admin") {
        next();
      } else {
        return validationError(res, "Access denied!");
      }
    } catch (e) {
      return e.message;
    }
  }

  static async isSeller(req, res, next) {
    if (req.userInfo.role === "seller") {
      next();
    } else {
      next(new Error("You are not a seller"));
    }
  }
}
