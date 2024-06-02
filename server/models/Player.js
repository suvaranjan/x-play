const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillRatingsSchema = new Schema({
    smartPlayerRating: Number,
    goodPassingRating: Number,
    goodRunnerAndPositioningRating: Number,
    goodDefenderRating: Number,
    goodSkillsRating: Number,
    aggressiveRating: Number,
    goodPressingRating: Number
}, { _id: false });

const analysisParametersSchema = new Schema({
    topSpeed: Number,
    topSpeedDate: Date,
    goalScored: Number,
    goalScoredDate: Date,
    goalAssist: Number,
    goalAssistDate: Date,
    topShootingSpeed: Number,
    topShootingSpeedDate: Date,
    travelDistance: Number,
    travelDistanceDate: Date,
    successPass: Number,
    successPassDate: Date,
    failedPass: Number,
    failedPassDate: Date
}, { _id: false });

const contractDetailsSchema = new Schema({
    startDate: Date,
    period: String,
    borrowFee: Number,
    sellingFee: Number,
    commissionOnRenting: Number,
    commissionOnWinning: Number,
    jerseyNumber: String,
    teamRole: String,
    teamRolePeriod: String,
    teamRoleName: String,
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });

const playerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobContractTillWhen: Date,
    yearsOfExperience: Number,
    hoursPlayedPerWeek: Number,
    titlesOwn: String,
    titlesWithSpecificTeamName: String,
    strikerPositionScore: Number,
    wingerPositionScore: Number,
    midfielderPositionScore: Number,
    wingDefenderPositionScore: Number,
    centralBackPositionScore: Number,
    currentTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
    teamInvitations: [{
        type: Schema.Types.ObjectId,
        ref: 'Team',
    }],
    value: {
        type: Number,
        default: 0,
    },
    zGold: {
        type: Number,
        default: 0,
    },
    introduction: String,
    selfRating: Number,
    teamContract: contractDetailsSchema,
    bankTopUp: Number,
    level: Number,
    watchingTime: Number,
    playingTime: Number,
    fans: [{
        type: Schema.Types.ObjectId,
        ref: 'Fan',
    }],
    comments: [{
        body: String,
        date: Date,
    }],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating',
    }],
    endorsements: [{
        type: Schema.Types.ObjectId,
        ref: 'Endorsement',
    }],
    skills: skillRatingsSchema,
    analysisParameters: analysisParametersSchema,
    unavailableDates: [{
        date: Date,
        description: String,
    }],
    socialInteractionHistory: [String],
    discussionPoints: Number,
    paymentHistory: [String],
    shoppingHistory: [String],
    payFor: [String],
    checkinTime: Date,
    checkinPhotos: [String],
    contractOffers: [contractDetailsSchema],
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
