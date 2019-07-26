const express = require("express");
const router = express.Router();

const { submitLogin } = require("../controllers/index");

// POST  gets urlencoded bodies
router.post("/", submitLogin);

// // POST  gets JSON bodies
// router.post("/", function(req, res) {
//   // create user in req.body
// });

module.exports = router;
