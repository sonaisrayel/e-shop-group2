import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
});

const Order = mongoose.model('Order', orderSchema);
export { Order };
