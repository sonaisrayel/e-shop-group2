import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";



export const getUsers = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const { userInfo } = req;

     const [users, total] = await Promise.all([
      User.find({}).limit(limit).skip(skip).select("-password"),
      User.countDocuments(),
    ]);

    res.status(200).send({ users, total });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const { id } = req.params;

    const [user] = await User.find({ _id: id });

    if (!user) {
      throw new Error("This user doesn't exist");
    }

    const userProducts = await Product.find({ ownerId: id })
      .limit(limit)
      .skip(skip);

    res.status(200).send({ userProducts });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const { name, surname } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { name, surname },
      { new: true },
    );

    res.status(404).send({ message: "User updated", user: updatedUser });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

export const addUserImage = async (req, res) => {
  try {
    const { userInfo } = req;
    const updatedUser = await User.findOneAndUpdate(
      {_id: userInfo.id},
      {pictureUrl: req.file.path},
      {new: true}
    );
    res.status(201).send({message: 'Image uploaded', user: updatedUser})
  } catch (e) {
    res.status(404).send(e.message)
  }
}