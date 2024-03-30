import jwtLib from "../libs/jwt-lib.js";
import ResponseHandler from "../handlers/response-handling.js";
import { validationError } from "../handlers/error-handling.js";

export const adminLogin = async (req, res, next) => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const { username, password } = req.body;

    if (username !== adminUsername && password !== adminPassword) {

      return validationError(res, "Access denied! You are not admin.");
    }
    const token = await jwtLib.signAdminToken({
      role: "admin",
      username: adminUsername,
    });
    return ResponseHandler.handlePostResponse(res, {
      admin: { username: adminUsername },
      token,
    });
  } catch (e) {
    next(e.message);
  }
};
