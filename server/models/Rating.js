const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    target: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'targetModel'
    },
    targetModel: {
        type: String,
        required: true,
        enum: ['Player', 'Team']
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);
