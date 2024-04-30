import { Card } from "../models/card-model.js";

import ResponseHandler from "../handlers/response-handling.js";

export const createCard = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const {
      card: { cardNumber, expiryDate, cvv },
    } = req.body;
    const createdCard = await Card.findOneAndUpdate(
      { userId: userInfo.id },
      { $addToSet: { cards: { card: { cardNumber, expiryDate, cvv } } } },
      { new: true },
    );

    return ResponseHandler.handlePostResponse(res, { cards: createdCard });
  } catch (e) {
    next(e.message);
  }
};

export const getCards = async (req, res, next) => {
  try {
    const userId = req.userInfo.id;

    const cards = await Card.find({ userId });
    console.log(cards);
    return ResponseHandler.handleListResponse(res, {
      cards,
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const userId = req.userInfo.id;

    const cardId = req.params.id;

    const updatedUser = await Card.findOneAndUpdate(
      { userId },
      { $pull: { cards: { _id: cardId } } },
      { new: true },
    );

    // console.log(userId);
    // console.log(cardId);
    // console.log(updatedUser);

    return ResponseHandler.handleDeleteResponse(res, {
      cards: updatedUser,
    });
  } catch (error) {
    next(error.message);
  }
};
