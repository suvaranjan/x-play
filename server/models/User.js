const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['Player', 'Team', 'Referee', 'Fan'],
        required: true,
    },
    fullName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    occupation: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
