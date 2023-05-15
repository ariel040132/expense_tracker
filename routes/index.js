const express = require("express");
const router = express.Router();
//const { authenticator } = require("../middleware/auth");

const expense = require("./modules/expense");
const home = require("./modules/home");
// const users = require("./modules/users");
// const auth = require("./modules/auth");

router.use("/expense", expense); //authenticator
// router.use("/users", users);
// router.use("/auth", auth);
router.use("/", home); //authenticator

module.exports = router;
