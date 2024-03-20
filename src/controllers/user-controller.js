import { User } from '../models/user-model.js';
import { Product } from '../models/product-model.js';

export const getUsers = async (req, res) => {
    try {
        const {limit, skip} = req.query
        const { userInfo } = req;

        if (userInfo.role !== "admin") {
            throw new Error('For see all users you must be an admin');
        }

        const users = await User.find({}).limit(limit).skip(skip);
        res.status(200).send({users});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}

export const getUserProducts = async (req, res) => {
    try {

        const {limit, skip} = req.query      
        const { id } = req.params;

        const [user] = await User.find ({_id:id})

        if (!user) {
            throw new Error("This user doesn't exist");
        }

        const userProducts = await Product.find({ ownerId: id}).limit(limit).skip(skip);

        res.status(200).send({userProducts});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const updatedUser = await User.findOneAndUpdate({id: id}, {updatedData: updatedData}, {new: true})
        res.status(404).send({message: "User updated", user: updatedUser})

    } catch (e) {
        res.status(404).send({message: e.message})
    }
}