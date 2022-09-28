const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSignUpSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
});

userSignUpSchema.methods.generateAccessToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_TOKEN);
  return token;
};

const User = mongoose.model("User", userSignUpSchema);

function validateUserSignUp(data) {
  const userSignUpSchema = Joi.object({
    name: Joi.string().required(),
  });

  return userSignUpSchema.validate(data);
}

module.exports = {
  validateUserSignUp,
  User,
};
