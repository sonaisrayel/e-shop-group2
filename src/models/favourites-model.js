import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favSchema = new Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  addedToFav: {
    type: Date,
    default: Date.now
  }

});

const Favourites = mongoose.model('Favourites', favSchema);
export { Favourites };
