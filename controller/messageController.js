const { Message } = require("../model/message");

require("express-async-errors");

const getMessageList = async (req, res) => {
  const message = await Message.find({ reader_id: req.user._id })
    .populate("reader_id sender_id")
    .select("-__v")
    .sort({});
  return res.status(200).json(message);
};

const createMessage = async (req, res) => {
  const io = req.app.locals.io;

  let { content, reader_id } = req.body;
  let message = await new Message({
    content,
    reader_id,
    sender_id: req.user._id,
  }).populate("reader_id sender_id");

  io.to(reader_id).emit("receive-message", message);
  message = await message.save();

  return res.status(200).json(message);
};

exports.getMessageList = getMessageList;
exports.createMessage = createMessage;
