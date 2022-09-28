const express = require("express");
const mongoose = require("mongoose");
const indexRoute = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("error connecting");
  });

const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    socket.join(data.user_id);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
  });
});

app.locals.io = io;
exports = module.exports = app;

app.use(express.json());
app.use(cors());

app.use("/api", indexRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Started up at prot ${PORT}`);
});
