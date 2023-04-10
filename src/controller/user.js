const Post = require("../modal/Post");
const UserModal = require("../modal/user");

const addUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(404).send({
      status: "warning",
      message: `Name or email is missing`,
    });
  }

  try {
    const user = new UserModal({ ...req.body });
    await user.save();
    res.status(200).send({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getUserById = async (req, res) => {
  let { id } = req.params;
  try {
    let singleUser = await UserModal.findOne({ _id: id });
    if (singleUser) {
      res.status(200).send({
        status: "success",
        message: "User getting successfully",
        data: singleUser,
      });
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let { name, bio } = req.body;
  try {
    let singleUser = await UserModal.findOne({ _id: id });
    if (singleUser) {
      let updatedUser = await UserModal.findByIdAndUpdate(
        id,
        { name, bio },
        { new: true }
      );
      res.status(200).send({
        status: "success",
        message: "User data updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    let singleUser = await UserModal.findOne({ _id: id });
    if (singleUser) {
      let deletedUser = await UserModal.findByIdAndDelete(id);
      res.status(200).send({
        status: "success",
        message: "User deleted successfully",
        data: deletedUser,
      });
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTotalUsersCount = async (req, res) => {
  try {
    let allUser = await UserModal.find().count();
    res.status(200).send({
      status: "success",
      message: "All users count get successfully",
      data: allUser,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTotalUsers = async (req, res) => {
  try {
    let allUser = await UserModal.find();
    res.status(200).send({
      status: "success",
      message: "All users get successfully",
      data: allUser,
    });
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

const getTopFiveActiveUsers = async (req, res) => {
  try {
    let topUsers = await Post.aggregate([
      { $group: { _id: "$user", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "user",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    console.log(topUsers);
    res.send(topUsers);
  } catch (er) {
    res.status(404).send({ status: "error", message: er.message });
  }
};

module.exports = {
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getTotalUsersCount,
  getTotalUsers,
  getTopFiveActiveUsers,
};
