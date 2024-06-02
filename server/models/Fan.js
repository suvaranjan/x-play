const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    favoriteTeams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    favoritePlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
});

module.exports = mongoose.model('Fan', fanSchema);
