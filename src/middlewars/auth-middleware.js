import JWTLib from "../libs/jwt-lib.js";

export default class Authorize {
    static async authorized (req, res, next){
        try {
            const { authorization } = req.headers;
            req.userInfo = await JWTLib.verifyUserToken(authorization);
            next();
        } catch (e) {
            return next(e.message)
        }
    }
}