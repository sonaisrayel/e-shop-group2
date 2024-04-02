import { Product } from "../models/product-model.js";
import { Bucket } from "../models/bucket-model.js";

export const addToBucket = async (req, res) => {
  const userInfo = req.userInfo;
  const { id } = req.params;

  // const userInfo = req.userInfo;

  const { productId, quantity } = req.body;
  const product = await Product.findOne({ _id: productId });

  // const product = Product.find({ _id: productId })
  // console.log(userInfo);

  if (!product) {
    res.status(404).send({ error: "Product not found" });
  }

  let bucket = await Bucket.findOne({ userId: userInfo.id }); //???

  if (!bucket) {
    bucket = new Bucket({
      userId: req.userInfo.id,
      items: [{ productId, quantity }],
    });
    await bucket.save();
    res.status(201).send(bucket);
  }
  console.log(bucket.items);
  // const existPrduct = bucket.items.findOne({productId: req.body.productId})
  const existPrduct = bucket.items.find(
    (item) => String(item.productId) === String(productId),
  );

  console.log(existPrduct);
  if (existPrduct) {
    bucket.items.find(
      (item) => String(item.productId) === String(productId),
    ).quantity += quantity;
  } else {
    bucket.items
      .find((item) => String(item.productId) === String(productId))
      .push({ productId, quantity });
  }

  console.log(typeof req.body.quantity);

  if (product.quantity < req.body.quantity) {
    res.status(400).send({ error: "The mentioned quantity is not available" });
  }

  await bucket.save();

  res.status(200).send(bucket);
};
