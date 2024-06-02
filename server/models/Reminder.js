const mongoose = require('mongoose');
const { Schema } = mongoose;

const reminderSchema = new Schema({
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const reminderSchema = new Schema({
//     teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
//     managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of specific recipients
// });

// const Reminder = mongoose.model('Reminder', reminderSchema);

// module.exports = Reminder;
