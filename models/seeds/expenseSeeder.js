const db = require("../../config/mongoose");
const Category = require("../category");
const Expense = require("../expense");
const expenseJson = require("./expense.json");

// const SEED_USER = []
db.once("open", () => {
  Promise.all(
    expenseJson.map((data) => {
      return Category.findOne({ name: data.category })
        .then((category) => {
          return Expense.create({
            name: data.name,
            date: data.date,
            amount: data.amount,
            categoryId: category._id,
          });
        })
        .then((expense) => console.log("expense = ", expense));
    })
  )

    .then(() => console.log("Done !"))
    .finally(() => process.exit());
});
