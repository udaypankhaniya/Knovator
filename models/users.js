const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        required: true
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users;
