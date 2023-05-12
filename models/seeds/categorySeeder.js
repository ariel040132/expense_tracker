const Category = require("../category");
const categoryJson = require("./category.json");
const db = require("../../config/mongoose");

db.once("open", () => {
  Promise.all(
    categoryJson.map((item) => {
      return Category.create({ ...item });
    })
  )
    .then((data) => console.log("category seeds is done!"))
    // Category.create(categoryJson)
    //   .then(() => {
    //     console.log("CategorySeeder done!");
    //     db.close();
    //   })
    .catch((error) => console.log(error));
});
