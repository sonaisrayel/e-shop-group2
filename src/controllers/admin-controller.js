import jwtLib from "../libs/jwt-lib.js";
import ResponseHandler from "../handlers/response-handling.js";
import { validationError } from "../handlers/error-handling.js";
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password !== ADMIN_PASSWORD || username !== ADMIN_USERNAME) {
      return validationError(res, "Access denied! You are not admin.");
    }
    const token = await jwtLib.signAdminToken({
      role: "admin",
      username: ADMIN_USERNAME,
    });
    return ResponseHandler.handlePostResponse(res, {
      admin: { username: ADMIN_USERNAME },
      token,
    });
  } catch (e) {
    next(e.message);
  }
};
