import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";

export const getUsers = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const { userInfo } = req;

    if (userInfo.role !== "admin") {
      throw new Error("For see all users you must be an admin");
    }

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

      const [userProducts, totalUserProducts] = await Promise.all([
      Product.find({ ownerId: id }).limit(limit).skip(skip),
      Product.countDocuments ({ ownerId: id })
  ])

  if (!userProducts.length) {
      throw new Error('Products not found!');            
  }
  
  res.status(200).send({products: userProducts, total: totalUserProducts});
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
