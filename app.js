const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;

//app.setting
const app = express();
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting routes
app.get("/", (req, res) => {
  res.render("index");
});

//*底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
