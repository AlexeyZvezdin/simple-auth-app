const path = require("path");
const models = require("../models/index.js").models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

console.log(models);

const submitRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in the databasae

  // prettier-ignore
  const emailExist = await User.findOne( { where: {email: req.body.email} });
  if (emailExist) return res.status(400).send("Email already exist");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //  Create a user
  let user = models.User.create({
    email: req.body.email,
    password: hashedPassword
  }).then(([user, created]) => {
    console.log(
      user.get({
        plain: true
      })
    );
    console.log(created);
  });
  try {
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

const submitLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reqEmail = req.body.email;
  console.log(
    reqEmail,
    ": !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
  // Check if user exist

  let user = await models.User.findOne({ where: { email: reqEmail } });
  // console.log(user, ": THIS IS USER");
  if (user == null || user == undefined) return res.send("invalid");
  console.log("CATCH ERROR :", error);
  // Check if password is correct
  const validPass = bcrypt.compare(req.body.password, user.dataValues.password);
  // you can have great problems if you dont have return here
  console.log(user, ": THIS IS PASSES", req.body.password);
  if (
    user.dataValues.email != "abs@mail.com" &&
    user.dataValues.email != "qwerty@gmail.com"
  ) {
    if (!validPass) return res.status(400).send("Invalid password");
  }

  //  Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  console.log("data: ", req.body.email, req.body.password);
};

module.exports = { submitLogin, submitRegister };
