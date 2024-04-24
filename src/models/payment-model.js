import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  methodId: {
    type: String,
    index: true,
    unique: true,
  },
  methodType: String,
  isDefault: Boolean,
});

const Payment = mongoose.model("Payment", PaymentMethodSchema);
export { Payment };
