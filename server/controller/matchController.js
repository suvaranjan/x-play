const Match = require("../models/Match");
const Team = require("../models/Team");
const { createNotification } = require("./notificationController");

const createMatch = async (req, res) => {
    try {
        const {
            teams,
            date,
            time,
            location,
            maxPlayers,
            matchPoster,
            description,
            winningAmount,
            rules
        } = req.body;

        // Input validation
        if (!teams || teams.length !== 2 || !date || !time || !location || !maxPlayers || !matchPoster || !description || !winningAmount || !rules) {
            return res.status(400).json({ msg: 'Invalid request' });
        }

        // Check if the user is authorized to create a match (assuming req.user contains the user's ID)
        if (!req.user) {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        // Create the match
        const match = new Match({
            teams,
            date,
            time,
            location,
            maxPlayers,
            matchPoster,
            description,
            winningAmount,
            rules,
            createdBy: req.user._id,
            matchStatus: 'scheduled' // Set the initial status to scheduled
        });

        await match.save();

        // Send notifications to team managers and players
        const teamManagerIds = teams.flat(); // Flatten the array of team IDs
        const uniqueManagerIds = [...new Set(teamManagerIds)]; // Remove duplicate IDs
        const creatorIndex = uniqueManagerIds.indexOf(req.user._id);
        if (creatorIndex !== -1) {
            uniqueManagerIds.splice(creatorIndex, 1); // Remove the creator's ID
        }

        const notificationType = 'match-scheduled';
        const notificationTitle = 'New Match Scheduled';
        const notificationMessage = `A new match has been scheduled on ${date} at ${time}.`;

        const redirectUrl = `/matches/${match._id}`;

        for (const managerId of uniqueManagerIds) {
            await createNotification(managerId, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                matchId: match._id
            });
        }

        // Send notifications to team players
        const teamsWithPlayers = await Team.find({ _id: { $in: teams } }).populate('players', 'user');

        for (const team of teamsWithPlayers) {
            for (const player of team.players) {
                await createNotification(player.user, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                    matchId: match._id
                });
            }
        }

        res.status(201).json({ msg: 'Match created successfully', match });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const getSingleMatchById = async (req, res) => {
    try {
        const matchId = req.params.matchId;

        const match = await Match.findById(matchId).populate('teams').populate('createdBy', 'fullName');

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        res.status(200).json({ match });
    } catch (error) {
        console.error('Error fetching single match:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const showUserMatches = async (req, res) => {
    try {
        const userId = req.user._id;

        const matches = await Match.find({ createdBy: userId });

        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching user matches:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const showAllMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate('teams').populate('createdBy', 'fullName');

        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching all matches:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    createMatch,
    getSingleMatchById,
    showUserMatches,
    showAllMatches
};
