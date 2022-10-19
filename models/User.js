// Schema, model requiring mongoose
const { Schema, model } = require('mongoose');

// userSchema with username, email, thoughts, and friends
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            "Please fill a valid email address",
            ],
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
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// userSchema virtual for friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// const User with userSchema model
const User = model('User', userSchema);

// Exporting User
module.exports = User; 