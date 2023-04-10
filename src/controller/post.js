const PostModal = require("../modal/Post");

const createPost = async (req, res) => {
  try {
    const post = new PostModal({ ...req.body });
    await post.save();
    res.status(200).send({
      status: "success",
      message: "Post created successfully",
      data: post,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getPostById = async (req, res) => {
  let { id } = req.params;
  try {
    let singlePost = await PostModal.findOne({ _id: id });
    res.status(200).send({
      status: "success",
      message: "Post get successfully",
      data: singlePost,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const updatePost = async (req, res) => {
  let { id } = req.params;
  let { content } = req.body;
  try {
    let singlePost = await PostModal.findOne({ _id: id });
    if (singlePost) {
      let updatedPost = await PostModal.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      res.status(200).send({
        status: "success",
        message: "Post data updated successfully",
        data: updatedPost,
      });
    } else {
      res.status(404).send({ status: "error", message: "Post not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const deletePost = async (req, res) => {
  let { id } = req.params;
  try {
    let singlePost = await PostModal.findOne({ _id: id });
    if (singlePost) {
      let deletedPost = await PostModal.findByIdAndDelete(id);
      res.status(200).send({
        status: "success",
        message: "Post deleted successfully",
        data: deletedPost,
      });
    } else {
      res.status(404).send({ status: "error", message: "Post not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const increasePostLikeCount = async (req, res) => {
  let { id } = req.params;
  try {
    let singlePost = await PostModal.findOne({ _id: id });
    if (singlePost) {
      let updateLike = await PostModal.findByIdAndUpdate(
        id,
        {
          likes: singlePost.likes + 1,
        },
        { new: true }
      );
      res.status(200).send({
        status: "success",
        message: "Like increases successfully",
        data: updateLike,
      });
    } else {
      res.status(404).send({ status: "error", message: "Post not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const decreasePostLikeCount = async (req, res) => {
  let { id } = req.params;
  try {
    let singlePost = await PostModal.findOne({ _id: id });
    if (singlePost.likes === 0) {
      return res.status(401).send({
        status: "error",
        message: "Like cann't be less than zero",
      });
    }
    if (singlePost) {
      let updateLike = await PostModal.findByIdAndUpdate(
        id,
        {
          likes: singlePost.likes - 1,
        },
        { new: true }
      );
      res.status(200).send({
        status: "success",
        message: "Like decreases successfully",
        data: updateLike,
      });
    } else {
      res.status(404).send({ status: "error", message: "Post not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTotalPostCount = async (req, res) => {
  try {
    let allPost = await PostModal.find().count();
    res.status(200).send({
      status: "success",
      message: "All Posts count get successfully",
      data: allPost,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTotalPost = async (req, res) => {
  try {
    let allPost = await PostModal.find();
    res.status(200).send({
      status: "success",
      message: "All Posts get successfully",
      data: allPost,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTopMostLikedPosts = async (req, res) => {
  try {
    let allPost = await PostModal.find().sort({ likes: -1 }).limit(5);
    res.status(200).send({
      status: "success",
      message: "Top five post get successfully",
      data: allPost,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  increasePostLikeCount,
  decreasePostLikeCount,
  getTotalPost,
  getTopMostLikedPosts,
  getTotalPostCount,
};
