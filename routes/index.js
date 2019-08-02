const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

const { submit } = require("../controllers/index");

// POST  gets urlencoded bodies
router.post("/", submit, () => {
  console.log("submit from router executed");
});

router.post("/verify", verify, (req, res) => {
  console.log("Yes i'm in the private route");
  res.send(req.user);
});

module.exports = router;
