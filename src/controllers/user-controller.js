import { User } from '../models/user-model.js';

export const getUsers = async (req, res) => {
    try {
        const {limit, skip} = req.query
        const { userInfo } = req;

        if (!userInfo) {
            throw new Error('You are not authorized!!!');
        }

        if (userInfo.role !== "admin") {
            throw new Error('For see all users you must be an admin');
        }

        const users = await User.find({}).limit(limit).skip(skip);
        res.status(200).send({users});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}
