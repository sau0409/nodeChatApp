const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const messages = require("../models/message");

//const dbURL = "mongodb://localhost:27017/chatapp";
//const dbURL = "mongodb+srv://node_chat_app:q1w2e3r4t5y6@cluster0.lpzbb.mongodb.net/nodechatapp?retryWrites=true&w=majority"

router.get("/check", (req, res) => res.status(200).send(req.body));
console.log(process.env.MongoDB_URI);
//connect to mongodb
mongoose.connect(
  process.env.MongoDB_URI || 'mongodb://localhost:27017/chatapp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongodb connected");
    }
  }
);


//get messages
router.get("/get/messages", async (req, res) => {
  try {
    const result = await messages.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(err.message);
  }
});

//post messages
router.post("/post/message", async (req, res) => {
  try {
    //save message to mongo
    const message = new messages(req.body);
    await message.save();

    //check for badword
    const badMessage = await messages.findOne({ text: "badword" });
    if (badMessage) {

      //delete entry from mongo
      await messages.deleteOne({ _id: badMessage._id });
    } else {

      //emitting event to client to update messages
      req.io.emit("messageEvent", req.body);
      res.status(200).send("message posted");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
