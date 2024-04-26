import mongoose from "mongoose";

const Schema = mongoose.Schema;
const cardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
     },
     cards:[{
  cardNumber: {
    type: String,
    required: true,
    
  },
  expiryDate: {
    type: Date,
    required: true,
    
  },
  cvv: {
    type: String,
    required: true,
   
  },
}
],
});

const Card = mongoose.model("Card", cardSchema);
export { Card };
