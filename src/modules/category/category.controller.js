const Category = require("./category.model");
const express = require("express");
const router = express.Router();
const Order = require("./order.model");
const { moveElementInArray } = require("../../utils");

const orderCategory = async (categories) => {
  const { order } = await Order.findOne();
  return order.map((o) => categories.find((c) => c._id == o));
};
router.get("/", async (req, res) => {
  const categorys = await Category.find();
  res.json(await orderCategory(categorys));
});

router.post("/", async (req, res) => {
  const categories = await Category.find();
  const order = await Order.findOne();
  const category = new Category({
    title: "New Category",
  });
  category.save();

  order.order = [category._id, ...order.order];
  order.save();

  res.json(
    order.order.map((o) =>
      [{ ...category["_doc"], isNew: true }, ...categories].find(
        (c) => c._id == o
      )
    )
  );
});

router.put("/change-position", async (req, res) => {
  const { targetId, catId } = req.body;

  const order = await Order.findOne();
  const neworder = moveElementInArray(order.order, catId, targetId);
  order.order = neworder;
  order.save();

  const categorys = await Category.find();

  const orderedCategorys = neworder.map((o) =>
    categorys.find((c) => c._id == o)
  );
  res.json(orderedCategorys);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  const order = await Order.findOne();
  order.order = order.order.filter((o) => o != req.params.id);
  order.save();
  res.json(category);
});

module.exports = router;
