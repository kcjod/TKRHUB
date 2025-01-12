const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  company: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    set: (value) => {
      const date = new Date(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [],
});

module.exports = mongoose.model("Post", postSchema);
