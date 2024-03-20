import { Order } from "../models/order-model.js";
import { Product } from "../models/product-model.js";
import { User } from "../models/user-model.js";


export const createOrder = async (req, res) => {

 try {
        
        const { userId, productId, quantity, address, paymentMethod } = req.body;

        if (!Order) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

            const product = await Product.findOne({_id: productId});
            const userinfo = await User.findOne({_id:  userId});
            console.log(userinfo);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        const totalPrice = product.price * quantity;

        const newOrder = new Order ({
            userId: userinfo._id,
            productName: product.name,
            ownerID: product.ownerId,
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


export const getUserOrders = async (req, res) => {

    try {
        const { id } = req.query

        const userOrders = await Order.find({ userId: id });

        res.status(200).send(userOrders)

    } catch (error) {

        res.status(404).send({ error: 'Something went wrong' });
    }

}

export const getOwnerOrders = async (req, res) => {

    try {
        const { id } = req.query

        const ownerOrders = await Order.find({ ownerID: id });

        res.status(200).send(ownerOrders)

    } catch (error) {

        res.status(404).send({ error: 'Something went wrong' });
    }

}

export const getOrders = async (req, res) => {

    // const { id } =req.params

    const userOrders = await Order.find({});

    res.status(200).send(userOrders)
}


// export const getOrders1 = async (req, res) => {

//     const { userId } =req.params

//     const userOrders = await Order.find({userId: req.userId});

//     res.status(200).send(userOrders)
// }


