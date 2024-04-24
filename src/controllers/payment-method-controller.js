import { Payment } from "../models/payment-model.js";
import { User } from "../models/user-model.js";

import StripeLib from "../libs/stripe-lib.js";

export const createPaymentMethod = async (req, res, next) => {
  try {
    const { card,type,shipping } = req.body;
    const userId = req.userInfo.id;
    let { isDefaultMethod } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user.paymentCustomerId) {
      const customer = await StripeLib.createCustomer({
        email: user.email,
      });

      user.paymentCustomerId = customer.id;
      await user.save()
    }

    if (!shipping) {
      user.shippingAddress = user.address;
    } else {
      user.shippingAddress = shipping
    }

    await user.save();

    const customerId = user.paymentCustomerId;


    const paymentMethod = await StripeLib.createPaymentMethod({
      card,
      type,
      customerId,
      billingDetails: {
        address: {
          line1: user.address.street,
          city: user.address.city,
          country: user.address.country,
        },
        name: user.name,
        email: user.email,
      },
    });


    const methodId = paymentMethod.id;
    const hasDefaultCard = await Payment.exists({
      userId,
      isDefault: true,
    });

    if (isDefaultMethod && !hasDefaultCard) {
      await StripeLib.setPaymentMethodAsDefault({ methodId, customerId });
    } else {
      isDefaultMethod = false;
    }

    const paymentMethodDoc = await Payment.create({
      userId,
      methodId,
      methodType: type,
      isDefault: isDefaultMethod,
    });

    res.status(201).send({ "message": paymentMethodDoc });
  } catch (error) {
    return next(error);
  }
};

export const updateUserPaymentMethod = async (req, res, next) => {
  try {
    const { isDefaultMethod, billingDetails } = req.body;
    const { paymentMethodId } = req.params;
    const userId = req.userInfo._id;

    const paymentMethodDoc = await Payment.findOne({
      _id: paymentMethodId,
      userId,
    });

    if (!paymentMethodDoc) {
      throw new Error(
        `The payment method with id = ${paymentMethodId} not found.`,
      );
    }

    const { isDefault, methodId } = paymentMethodDoc;

    if (!isDefaultMethod) {
      throw new Error("You need to have at leas one default payment method..");
    } else {
      await Payment.updateOne(
        { userId, isDefault: true },
        { isDefault: false },
      );
    }

    paymentMethodDoc.isDefault = isDefault;
    paymentMethodDoc.billingDetails = billingDetails;
    await paymentMethodDoc.save();

    const { paymentCustomerId } = await User.findOne({ _id: userId });

    await StripeLib.updatePaymentMethod({
      methodId,
      billingDetails,
      isDefaultMethod,
      customerId: paymentCustomerId,
    });

    res.status(201).send({ paymentMethodDoc });
  } catch (error) {
    return next(error);
  }
};

export const deletePaymentMethod = async (req, res, next) => {
  const { paymentMethodId } = req.params;

  try {
    await StripeLib.deletePaymentMethod({ methodId: paymentMethodId });

    const method = await Payment.findOneAndDelete({
      methodId: paymentMethodId,
    });

    if (!method) {
      throw new Error("The payment method is not found");
    }

    res.status(201).send({ message: method });
  } catch (error) {
    return next(error);
  }
};
