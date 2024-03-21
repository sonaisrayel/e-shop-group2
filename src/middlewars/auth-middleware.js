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
    const { userInfo } = req;
    
    if(userInfo && userInfo.role === 'admin'){
    next()
    } else {
      res.status(403).send("Forbidden")
    }
  
}
}

