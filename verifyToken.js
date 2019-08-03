const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //   const token = req.header("Authorization");
  const token = req.body.token;

  if (!token) return res.status(401).send("AccessDenied");

  try {
    const verified = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
        console.log(decoded, " THIS IS VERIFIEED");
        // req.user = decoded;
        res.send(decoded);
        next();
      }
    );
    // req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("InvalidToken");
  }
}
module.exports = auth;
