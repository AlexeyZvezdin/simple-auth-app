const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log(req.headers, " REQUEST TOKEN \n \n");
  if (!token) {
    next("PleaseLogin");
  }

  try {
    const DECODED = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("DECODED ", DECODED);
    req.user = DECODED;
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = auth;
