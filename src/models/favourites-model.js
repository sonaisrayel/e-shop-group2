import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    // required: true
  }],
},

  { timestamps: { createdAt: 'cretaedAt', updatedAt: 'updatedAt' } }

)

const Favourites = mongoose.model('Favourites', FavouritesSchema);
export { Favourites };