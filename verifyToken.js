const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //   const token = req.header("Authorization");
  const token = req.body.token;
  console.log("token from verifyToken");

  if (!token) return res.state(401).send("AccessDenied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    res.send("true");
    // next();
  } catch (err) {
    res.status(400).send("InvalidToken");
  }
}
