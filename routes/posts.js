const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  Truncatedcontent: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: []
})


module.exports = mongoose.model('Post',postSchema);