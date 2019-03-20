const mongoose = require('mongoose');


const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    allowComments: {
        type: Boolean,
        required: true
    },
    comments: [{
        commentBody:{
            type: String,
        },
        commentDate:{
            type: Date,
            default: Date.now
        },
        commentUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Story = mongoose.model('story',storySchema);

exports.Story = Story;
exports.storySchema = storySchema;