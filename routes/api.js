const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const messages = require("../models/message");

//const dbURL = "mongodb://localhost:27017/chatapp";

router.get("/check", (req, res) => res.status(200).send(req.body));
console.log(process.env.PORT);
//connect to mongodb
mongoose.connect(
  process.env.MongoDB_URI,
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
  console.log("post message received");
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
      console.log('triggering emit');
      //emitting event to client to update messages
      req.io.emit("messageEvent", req.body);
      res.status(200).send("message posted");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
