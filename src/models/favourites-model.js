import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
},

  { timestamps: { createdAt: 'cretaedAt', updatedAt: 'updatedAt' } }

)

const Favourites = mongoose.model('Favourites', FavouritesSchema);
export { Favourites };