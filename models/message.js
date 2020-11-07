const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema({
    name: String,
    text: String
});

module.exports = mongoose.model("messages", messageSchema, "messages");