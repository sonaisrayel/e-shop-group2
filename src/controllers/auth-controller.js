import { User } from "../models/user-model.js";
import { userValidationSchema } from "../validations/user-validation.js";
import { passwordValidationSchema } from "../validations/password-validation.js";
import ResponseHandler from "../handlers/response-handling.js";
import {  validationError } from "../handlers/error-handling.js";
import { Favourites } from "../models/favourites-model.js";
import { Bucket } from "../models/bucket-model.js";

import CryptoLib from "../libs/crypto-lib.js";
import JWTLib from "../libs/jwt-lib.js";

export const registration = async (req, res, next) => {
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

    if (user.role === "buyer") {
      await Promise.all([
        Favourites.create({
          userId: user._id,
          products: [],
        }),
        Bucket.create({
          userId: user._id,
          products: [],
        }),
      ]);
    }

    return ResponseHandler.handlePostResponse(res, { user: user });
  } catch (e) {
    next(e.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await User.find({ email });

    const [userParams] = userInfo;

    if(!userParams){
      return validationError(res, "You are not registered");
    }

    const user = await CryptoLib.compare(password, userParams);

    if (!user) {
      return validationError(res, "Invalid Password");
    }

    const token = await JWTLib.signUserToken({
      id: userParams.id,
      email: userParams.email,
      username: userParams.username,
      role: userParams.role,
    });

    return ResponseHandler.handlePostResponse(res, {
      user: { username: userParams.username, email: userParams.email,role:userParams.role },
      token,
    });
  } catch (e) {
    next(e.message);
  }
};
