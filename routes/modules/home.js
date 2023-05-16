const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Category.find({})
    .lean()
    .then((category) => {
      Expense.find({ userId })
        .populate("categoryId")
        .lean()
        .sort({ _id: "asc" })
        .then((expenseData) => {
          let totalAmount = 0;
          for (let i in expenseData) {
            //expenseData[i].date = expenseData[i].date.toLocaleDateString();
            totalAmount += expenseData[i].amount;
          }
          res.render("index", { expenseData, category, totalAmount });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { categoryId } = req.body;
  const userId = req.user._id;
  if (categoryId === "all") {
    return res.redirect("/");
  }
  return Category.find()
    .lean()
    .then((category) => {
      return Expense.find({ userId, categoryId })
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((expenseData) => {
          let totalAmount = 0;
          for (let i in expenseData) {
            totalAmount += expenseData[i].amount;
          }
          return res.render("index", { expenseData, totalAmount, category });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
