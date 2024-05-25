const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = new User({ username, email });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      // Remove user's associated thoughts when deleted
      await Thought.deleteMany({ userId: req.params.userId });
      
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.push(friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends = user.friends.filter(friend => friend !== friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = userController;
