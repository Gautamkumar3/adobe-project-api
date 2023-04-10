const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user_id is required"],
  },
  content: {
    type: String,
    minLength: 1,
    maxLength: 300,
  },
  likes: { type: Number, min: 0, default: 0 },
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
