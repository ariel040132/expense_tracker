const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
const routes = require("./routes");
const methodOverride = require("method-override");
const session = require("express-session");
const usePassport = require("./config/passport");
const flash = require("connect-flash");
require("./config/mongoose");

//*======app.setting======

const app = express();
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});
//*====引入路由應在底部====
app.use(routes);
//*底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
