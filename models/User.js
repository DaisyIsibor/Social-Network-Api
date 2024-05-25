const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema(
{
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ],
},
{
    toJSON: { virtuals: true },
    id: false,
}
);

userSchema.virtual('friendCount').get(function() {
return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
