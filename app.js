const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
const routes = require("./routes");
const methodOverride = require("method-override");
const session = require("express-session");
const usePassport = require("./config/passport");
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
//*====引入路由應在底部====
app.use(routes);
//*底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
