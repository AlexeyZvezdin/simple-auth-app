const express = require("express");
const router = express.Router();

const { submitLogin, submitRegister } = require("../controllers/index");

// POST  gets urlencoded bodies
router.post("/", submitLogin, () => {
  console.log("submit login from router executed");
});

// router.post("/", submitRegister);

// // POST  gets JSON bodies
// router.post("/", function(req, res) {
//   // create user in req.body
// });

module.exports = router;
