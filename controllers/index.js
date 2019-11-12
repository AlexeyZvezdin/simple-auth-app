const path = require("path");
const models = require("../models/index.js").models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

const submit = async (req, res) => {
  switch (req.body.register) {
    case true:
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
          console.log(data.dataValues.email, " USER EMAIL");
        });
        res.send({ data: "success" });
      } catch (err) {
        res.status(400).send(err);
      }

    default:
      const { errorValidation } = loginValidation(req.body);
      if (errorValidation)
        return res.status(400).send(error.details[0].message);

      const reqEmail = req.body.email;

      // Check if user exist
      let user = await models.User.findOne({ where: { email: reqEmail } });
      if (user == null || user == undefined) return res.status(400);
      // Check if password is correct
      // Ignore default password for bcrypt comparsion
      if (
        user.dataValues.email != "abs@mail.com" &&
        user.dataValues.email != "qwerty@gmail.com"
      ) {
        const validPass = await bcrypt.compare(
          req.body.password,
          user.dataValues.password
        );
        if (!validPass)
          return res.status(400).send({
            error: "No such Login or Password in preseted emails"
          });
      }

      //  Create and assign a token
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
      res.set("authorization", token).send(token);
  }
};

const profile = async (req, res) => {
  console.log(req.body, " this is req QUERY \n \n");
  try {
    let user = await models.Profile.findOne({
      where: { UserId: req.query.id }
    });
    res.send(user);
  } catch (error) {
    console.log(error, " THIS IS PROFILE ERROR BCK");
  }
};

module.exports = { submit, profile };
