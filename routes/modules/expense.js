const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");
const category = require("../../models/category");

//! 新增功能
router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .then((category) => res.render("new", { category }));
});

router.post("/new", (req, res) => {
  const userId = req.user._id;
  const { name, date, categoryId, amount } = req.body;
  if (!name || !date || !categoryId || !amount) {
    return Category.findById(categoryId)
      .lean()
      .then(() => res.render(res.render("new", { name, date, amount })));
  }
  Expense.create({ ...req.body, userId })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log("Error saving data to database:", err);
      res.redirect("/");
    });
});
//! 編輯功能
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Category.find()
    .lean()
    .then((category) => {
      return Expense.findOne({ userId, _id })
        .lean()
        .then((expense) => res.render("edit", { expense, category }));
    });
});
//! 編輯更新
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  //const reqUpdateObj = { userId, ...req.body };
  Expense.findByIdAndUpdate({ userId, _id }, req.body)
    .then((data) => {
      //console.log("data is =", data);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

//! 刪除功能
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Expense.findOne({ userId, _id })
    .then((expense) => {
      expense.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

//*底部
module.exports = router;
