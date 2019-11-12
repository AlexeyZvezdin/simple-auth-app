//  VALIDATION
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = data => {
  // prettier-ignore
  const schema = {
        register: Joi.boolean().invalid(false),    
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  // prettier-ignore
  const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
