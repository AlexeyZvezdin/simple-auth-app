const path = require("path");

module.exports = {
  submitLogin: function(req, res) {
    console.log("data: ", req.body.email, req.body.password);
    res.redirect("/");
  }
};
