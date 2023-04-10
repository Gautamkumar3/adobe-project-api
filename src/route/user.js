const express = require("express");
const {
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getTotalUsersCount,
  getTotalUsers,
  getTopFiveActiveUsers,
} = require("../controller/user");

const userRouter = express.Router();

userRouter.post("/users", addUser);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.get("/analytics/users", getTotalUsersCount);
userRouter.get("/allusers", getTotalUsers);
userRouter.get("/analytics/users/top-active", getTopFiveActiveUsers);

module.exports = userRouter;
