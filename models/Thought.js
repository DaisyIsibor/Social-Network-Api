//model/thought.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
{
    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString()
    },
    username: {
    type: String,
    required: true,
    },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }], // Array of references to Reaction model
},
{
    toJSON: { getters: true },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function() {
return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
