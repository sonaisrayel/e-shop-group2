import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Favourites = mongoose.model('Favourites', favSchema);
export { Favourites };
