const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

//*app.setting
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//*setting routes
app.get("/", (req, res) => {
  res.render("index");
});

//*底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
