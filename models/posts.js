const mongoose = require('mongoose');

// Define Post Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

const post = mongoose.model('post', postSchema);
module.exports = post;
