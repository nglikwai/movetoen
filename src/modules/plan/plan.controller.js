const Plan = require("./plan.model");
const express = require("express");
const router = express.Router();
const { exportPlan } = require("./plan.service");

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

router.post("", async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Plan.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });
});

router.delete("/:id", async (req, res) => {
  const plan = await Plan.findByIdAndDelete(req.params.id);
  res.json(plan);
});

router.post("/password", async (req, res) => {
  const { password, id } = req.body;
  const plan = await Plan.findById(id);
  if (plan.password === password) {
    res.json({ result: true });
    return;
  }
  res.json({ result: false });
});

router.get("/export/:id", async (req, res) => {
  const workbook = await exportPlan(req.params.id);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=todos.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
