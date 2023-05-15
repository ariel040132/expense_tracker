const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  //const userId = req.user._id;
  Category.find()
    .lean()
    .then((category) => {
      Expense.find({})
        .populate("categoryId")
        .lean()
        .sort({ _id: "asc" })
        .then((expenseData) => {
          //console.log("expenseData:", expenseData);
          res.render("index", { expenseData, category });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
