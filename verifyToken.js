const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log('THIS IS TOKEN AUTH ', token);
  if (!token) {
    res.status(401).send('PleaseLogin');
  }

  try {
    const DECODED = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('DECODED ', DECODED);
    req.user = DECODED;
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = auth;
