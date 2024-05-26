const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const connection = require('../config/connection');

// Handle connection errors
connection.on('error', (err) => {
console.error('MongoDB connection error:', err);
  process.exit(1); // Exit with error
});

// Once connected, start seeding data
connection.once('open', async () => {
try {
    console.log('Connected to MongoDB.');

    // Seed users
    await User.deleteMany(); // Clear existing users

    const users = [
    {
        username: 'Alexandre',
        email: 'alexandre@gmail.com'
    },
      // Add more users if needed
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully:', createdUsers);

    // Seed thoughts
    await Thought.deleteMany(); // Clear existing thoughts

    const thoughts = [
    {
        thoughtText: "Here's a cool thought...",
        username: "Alexandre",
        userId: createdUsers[0]._id // Use the ID of the first created user
    },
      // Add more thoughts if needed
    ];

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Thoughts seeded successfully:', createdThoughts);

    // Disconnect from database
    await mongoose.disconnect();
    console.log('Seeding completed. Disconnected from database.');
} catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Exit with error
}
});
