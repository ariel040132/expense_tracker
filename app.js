const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
const routes = require("./routes");

require("./config/mongoose");

//*======app.setting======

const app = express();

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      add_icon: function (thisA, schemaB) {
        return thisA.icon;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.use(routes);
//*底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
