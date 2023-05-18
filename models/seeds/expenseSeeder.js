const db = require("../../config/mongoose");
const Category = require("../category");
const Expense = require("../expense");
const expenseJSON = require('./expense.json')
const User = require('../user')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'user',
  email: "user@example.com",
  password: "12345678"
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(expenseJSON.map(item=>{
        return Category.findOne({name:item.category}).then(category=>{
          return Expense.create({
            name: item.name,
            date: item.date,
            amount: item.amount,
            categoryId: category._id,
            userId: user._id
          })
        }).then(expense => console.log('expense = ', expense))
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
