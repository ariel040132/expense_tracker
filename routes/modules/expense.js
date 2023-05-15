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
  //const userId = req.user._id;
  const { name, date, categoryId, amount } = req.body;
  if (!name || !date || !categoryId || !amount) {
    return Category.findById(categoryId)
      .lean()
      .then(() => res.render(res.render("new", { name, date, amount })));
  }
  Expense.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log("Error saving data to database:", err);
      res.redirect("/"); // 或者顯示錯誤訊息給使用者
    });
});
//! 編輯功能
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  Category.find()
    .lean()
    .then((category) => {
      return Expense.findOne({ _id })
        .lean()
        .then((expenses) => res.render("edit", { expenses, category }));
    });
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  //const userId = req.user._id;
  //const reqUpdateObj = { userId, ...req.body };
  Expense.findByIdAndUpdate(_id, req.body)
    .then((data) => {
      console.log("data is =", data);
      res.redirect("/"); //`/expense/${data._id}`
    })
    .catch((err) => console.log(err));
});
//*底部
module.exports = router;
