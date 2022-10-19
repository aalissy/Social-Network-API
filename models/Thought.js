// Const Schema, model, Types require mongoose
const { Schema, model, Types } = require('mongoose');
// Const moment requires moment for date formatting
const moment = require('moment');

// reactionSchema with id, body, username, and date created
const reactionSchema = new Schema (    
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), 
        }, 
        reactionBody: {
            type: String, 
            required: true, 
            maxlength: 280,
        }, 
        username: {
            type: String, 
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a")
        }
    }
)

// thoughtSchema with text, date created, username, and reactions
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
            get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

// thoughtSchema virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// const Thought with thoughtSchema model
const Thought = model('Thought', thoughtSchema); 

// Exporting Thought
module.exports = Thought;