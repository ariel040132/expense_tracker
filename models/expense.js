//使用mongoose的Schema
const mongoose = require("mongoose");
//const DateOnly = require("mongoose-dateonly")(mongoose);
const Schema = mongoose.Schema;
//Schema建構子：自定義每筆資料有哪些欄位和欄位的屬性
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   index: true,
  //   required: true,
  // },
});

module.exports = mongoose.model("expense", expenseSchema);
