import { User } from "../models/user-model.js";
import { userValidationSchema } from "../validations/user-validation.js";
import { passwordValidationSchema } from "../validations/password-validation.js";
import ResponseHandler from "../handlers/response-handling.js";

import CryptoLib from "../libs/crypto-lib.js";
import JWTLib from "../libs/jwt-lib.js";

export const registration = async (req, res) => {
  try {
    const { name, surname, username, password, repeatPassword, email, role } =
      req.body;

    await passwordValidationSchema.validateAsync({ password, repeatPassword });
    await userValidationSchema.validateAsync({
      name,
      surname,
      username,
      password,
      repeatPassword,
      email,
    });

    const passwordHash = await CryptoLib.makeHash(password);

    const newUser = new User({
      name,
      surname,
      username,
      password: passwordHash,
      email,
      role,
    });

    await newUser.save();

    const user = await User.findOne({ username: newUser.username }).select(
      "-password",
    );

    return ResponseHandler.handlePostResponse(res, { user: user });
  } catch (e) {
    return ResponseHandler.handleErrorResponse({ message: e.message }, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfo = await User.find({ email });

    const [userParams] = userInfo;

    const user = await CryptoLib.compare(password, userParams);

    if (!user) {
      return ResponseHandler.handleErrorResponse(
        "You are not registered!",
        res,
      );
    }

    const token = await JWTLib.signUserToken({
      id: userParams.id,
      email: userParams.email,
      username: userParams.username,
      role: userParams.role,
    });

    return ResponseHandler.handlePostResponse(res, {
      user: { username: userParams.username, email: userParams.email },
      token,
    });
  } catch (e) {
    return ResponseHandler.handleErrorResponse({ message: e.message }, res);
  }
};
