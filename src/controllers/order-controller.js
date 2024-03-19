import { Order } from "../models/order-model.js";

import { Product } from "../models/product-model.js";


export const createOrder = async (req, res) => {

 try {
        
        const { productName, quantity, address, paymentMethod } = req.body;

        if (!Order) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

               const product = await Product.findOne({ name: productName });
               
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        const totalPrice = product.price * quantity;

        const order = {
            productName: productName,
            price: product.price,
            quantity: quantity,
            address: address,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice
        };
       
        return res.status(200).send(order);
        
    } catch (error) {
        
        return res.status(404).send({ error: 'Error processing order:' });

       
    }
}

