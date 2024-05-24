const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController");

// Route to get all users and create a new user
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// Route to get, update, and delete a single user
router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Route to add and delete a friend for a user
router.route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
