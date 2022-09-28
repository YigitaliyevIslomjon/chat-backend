const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi").extend(require("@joi/date"));

const messageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  reader_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(data) {
  const messageSchema = Joi.object({
    message: Joi.string().required(),
  });

  return messageSchema.validate(data);
}

module.exports = {
  validateMessage,
  Message,
};
