const express = require("express");
const router = express.Router();
const auth = require("../verifyToken");

const { submit, profile } = require("../controllers/index");

// POST  gets urlencoded bodies
router.post("/submit", submit, (req, res, next) => {
  console.log("\nsubmit from router executed");
});

router.get("/profile", auth, profile, (req, res) => {
  console.log("Return profile info");
});

module.exports = router;
