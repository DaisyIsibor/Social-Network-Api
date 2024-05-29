const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

const thoughtController = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = new Thought({ thoughtText, username, userId });
      const savedThought = await thought.save();
      
      // Push the created thought's _id to the associated user's thoughts array field
      await User.findByIdAndUpdate(userId, { $push: { thoughts: savedThought._id } });

      res.status(201).json(savedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.thoughtId);
      res.json({ message: 'Thought deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const newReaction=new Reaction(req.body);
      await newReaction.save();


      thought.reactions.push(newReaction._id);
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions = thought.reactions.filter(reactionId=> reactionId.toString() !== req.params.reactionId);
      const updatedThought = await thought.save();
      res.json(updatedThought);

      // option to also delete the Reaction document itself from the database 

      await
      Reaction.findByIdAndDelete(req.params.reactionId);
      res.json(updatedThought);

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = thoughtController;
