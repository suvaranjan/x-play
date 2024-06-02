const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }],
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    matchPoster: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    winningAmount: {
        type: Number,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    winningTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    matchStatus: {
        type: String,
        enum: ['scheduled', 'ongoing', 'completed'],
        default: 'scheduled'
    }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
