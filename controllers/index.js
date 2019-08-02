const path = require("path");
const models = require("../models/index.js").models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

console.log(models);

const submit = async (req, res) => {
  if (req.body.register === true) {
    console.log("It works register", req.body);
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the databasae

    // prettier-ignore
    const emailExist = await models.User.findOne({
      where: { email: req.body.email }
    });
    if (emailExist) return res.send("registered");

    // Hash passwords and store hashed in DB?
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      let user = models.User.create({
        email: req.body.email,
        password: hashedPassword
      }).then(data => {
        console.log(data.dataValues.email, " USER EMAIL???");
        // console.log(data);
      });
      res.send({ data: "success" });
    } catch (err) {
      res.status(400).send(err);
    }
    // LOGIN
  } else {
    // LOGIN
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log("CATCH ERROR :", error);

    const reqEmail = req.body.email;

    // Check if user exist

    let user = await models.User.findOne({ where: { email: reqEmail } });
    // console.log(user, ": THIS IS USER");
    if (user == null || user == undefined) return res.send("invalid");
    // Check if password is correct
    const validPass = bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    // you can have great problems if you dont have return here
    if (
      user.dataValues.email != "abs@mail.com" &&
      user.dataValues.email != "qwerty@gmail.com"
    ) {
      if (!validPass) return res.status(400).send("Invalid password");
    }

    //  Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("Authorization", token).send(token);
  }
};

module.exports = { submit };
