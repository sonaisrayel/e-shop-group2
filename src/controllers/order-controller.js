import { Order } from "../models/order-model.js";
import { Product } from "../models/product-model.js";
import { User } from "../models/user-model.js";


export const createOrder = async (req, res) => {

 try {
        
        const { userId, productId, quantity, address, paymentMethod } = req.body;

        if (!Order) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

            const product = await Product.findOne({_id:productId});
            const userinfo = await User.findOne({_id:  userId});

            console.log(userinfo);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        const totalPrice = product.price * quantity;

        const newOrder = new Order ({
            userId: userinfo._id,
            productName: product.name,
            price: product.price,
            quantity: quantity,
            address: address,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice
        });

        const order = await newOrder.save()
       
        res.status(200).send({order,  massage: "Your order is placed successfully" });
        
    } catch (error) {
        
       res.status(404).send({ error: 'Error processing order:' });
    }
}
