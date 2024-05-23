const router = require('express').Router();
const { User } = require('../models');

// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get users.' });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user.' });
  }
});

// POST a new user
router.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create user.' });
  }
});

// PUT to update a user by its _id
router.put('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user.' });
  }
});

// DELETE to remove user by its _id
router.delete('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const router = require('express').Router();
const { User } = require('../models');

// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get users.' });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user.' });
  }
});

// POST a new user
router.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create user.' });
  }
});

// PUT to update a user by its _id
router.put('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user.' });
  }
});

// DELETE to remove user by its _id
router.delete('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Bonus: Remove user's associated thoughts
    // Note: You need to implement this logic in your model
    // await Thought.deleteMany({ username: user.username });
    res.json({ message: 'User deleted.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete user.' });
  }
});

// POST to add a new friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found.' });
    }
    user.friends.push(friend);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add friend.' });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      return res.status(404).json({ error: 'Friend not found in user\'s friend list.' });
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to remove friend.' });
  }
});

module.exports = router;


// POST to add a new friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found.' });
    }
    user.friends.push(friend);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add friend.' });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      return res.status(404).json({ error: 'Friend not found in user\'s friend list.' });
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to remove friend.' });
  }
});

module.exports = router;
