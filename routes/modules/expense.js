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
  Expense.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log("Error saving data to database:", err);
      res.redirect("/"); // 或者顯示錯誤訊息給使用者
    });
});

//*底部
module.exports = router;
