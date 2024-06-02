const User = require("../models/User");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Fan = require('../models/Fan');
const Rating = require('../models/Rating');

const { createNotification } = require("./notificationController")


const getPlayerBySearch = async (req, res) => {
    try {
        const keyword = req.query.search;

        if (!keyword) {
            return res.status(400).json({ msg: 'Search keyword is required' });
        }

        // Find users whose full name matches the keyword
        const users = await User.find({ fullName: new RegExp(keyword, 'i') });

        // Extract user IDs
        const userIds = users.map(user => user._id);

        // Find players that reference the matching users
        const players = await Player.find({ user: { $in: userIds } }).populate('user', 'fullName profilePhoto');

        // Filter the results to include fullName, playerId, profilePhoto, and _id of each matching player
        const filteredResults = players.map(player => ({
            fullName: player.user.fullName,
            playerId: player._id,
            profilePhoto: player.user.profilePhoto,
            _id: player.user._id
        }));

        res.status(200).json(filteredResults);
    } catch (error) {
        console.error('Error searching players:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const addTeamInvitation = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;

        // Find the player by their ID
        const player = await Player.findById(playerId).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already in a team
        if (player.currentTeam) {
            return res.status(400).json({ msg: 'Player is already in a team' });
        }

        // Check if the team invitation already exists in the player's invitations
        if (player.teamInvitations.includes(teamId)) {
            return res.status(400).json({ msg: 'Team invitation already exists for this player' });
        }

        // Add the new team invitation to the player's document
        player.teamInvitations.push(teamId);
        await player.save();

        // Create a notification for the player
        const userId = player.user._id; // Ensure you get the user's ID
        const team = await Team.findById(teamId).select('name'); // Get team name for the notification

        const notificationType = 'team-invitation';
        const notificationTitle = 'New Team Invitation';
        const notificationMessage = `You have received an invitation to join the team ${team.name}.`;
        const redirectUrl = `/team-invitations`; // Assuming this is the URL format

        await createNotification(userId, notificationType, notificationTitle, notificationMessage, redirectUrl, {
            playerId: player._id,
            teamId: teamId,
        });

        res.status(200).json({ msg: 'Team invitation added successfully' });
    } catch (error) {
        console.error('Error adding team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const acceptTeamInvitation = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id

        const player = await Player.findOne({ user: userId }).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the team invitation exists in the player's invitations
        if (!player.teamInvitations.includes(teamId)) {
            return res.status(400).json({ msg: 'Team invitation does not exist for this player' });
        }

        // Remove the team invitation from the player's invitations
        const index = player.teamInvitations.indexOf(teamId);
        player.teamInvitations.splice(index, 1);

        // Update the player's current team with the accepted team
        player.currentTeam = teamId;
        await player.save();

        // Add the player to the team's players array
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        if (!team.players.includes(player._id)) {
            team.players.push(player._id);
            await team.save();
        }

        // Create a notification for the team managers
        const notificationType = 'team-invitation-accepted';
        const notificationTitle = 'Team Invitation Accepted';
        const notificationMessage = `${player.user.fullName} has accepted the invitation to join your team.`;
        const redirectUrl = `/team/${teamId}`; // Assuming this is the URL format

        // Send notifications to all team managers
        for (const manager of team.managers) {
            await createNotification(manager._id, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                playerId: player._id,
                teamId: teamId,
            });
        }

        res.status(200).json({ msg: 'Team invitation accepted successfully' });
    } catch (error) {
        console.error('Error accepting team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const rejectTeamInvitation = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id;

        // Find the player by user ID and populate user's full name
        const player = await Player.findOne({ user: userId }).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the team invitation exists in the player's invitations
        if (!player.teamInvitations.includes(teamId)) {
            return res.status(400).json({ msg: 'Team invitation does not exist for this player' });
        }

        // Remove the team invitation from the player's invitations
        const index = player.teamInvitations.indexOf(teamId);
        player.teamInvitations.splice(index, 1);
        await player.save();

        // Find the team by ID and populate the managers' full names
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Create a notification for the team managers
        const notificationType = 'team-invitation-rejected';
        const notificationTitle = 'Team Invitation Rejected';
        const notificationMessage = `${player.user.fullName} has rejected the invitation to join your team.`;
        const redirectUrl = `/team/${teamId}`; // Adjust this URL format as per your front-end routing

        // Send notifications to all team managers
        for (const manager of team.managers) {
            await createNotification(manager._id, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                playerId: player._id,
                teamId: teamId,
            });
        }

        res.status(200).json({ msg: 'Team invitation rejected successfully' });
    } catch (error) {
        console.error('Error rejecting team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const fetchTeamInvitations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the player by the user ID
        const player = await Player.findOne({ user: userId })
            .select('teamInvitations')
            .populate({
                path: 'teamInvitations',
                select: 'name'
            });

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        res.status(200).json(player.teamInvitations);
    } catch (error) {
        console.error('Error fetching team invitations:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const acceptContractOffer = async (req, res) => {
    try {
        const { offerDetails, teamId } = req.body;
        const userId = req.user._id;

        if (!offerDetails || !teamId) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const player = await Player.findOne({ user: userId }).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player already has a team contract
        if (player.teamContract && player.teamContract.team) {
            return res.status(400).json({ msg: 'Already in a contract' });
        }

        // Filter out the contract offer being accepted
        player.contractOffers = player.contractOffers.filter(offer => !offer.team.equals(teamId));

        // Set the team contract
        player.teamContract = {
            ...offerDetails,
            createdAt: new Date(),
        };

        // Update player's current team
        player.currentTeam = teamId;

        await player.save();

        // Find the team by ID and populate the managers' full names
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Create a notification for the team managers
        const notificationType = 'contract-accepted';
        const notificationTitle = 'Contract Accepted';
        const notificationMessage = `${player.user.fullName} has accepted the contract offer from your team.`;
        const redirectUrl = `/team/${teamId}`; // Adjust this URL format as per your front-end routing

        // Send notifications to all team managers
        for (const manager of team.managers) {
            await createNotification(manager._id, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                playerId: player._id,
                teamId: teamId,
            });
        }

        res.status(200).json({ msg: 'Contract offer accepted successfully' });
    } catch (error) {
        console.error('Error accepting contract offer:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const contractOfferReject = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id;

        if (!teamId) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const player = await Player.findOne({ user: userId }).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        const offerIndex = player.contractOffers.findIndex(offer => offer.team.equals(teamId));
        if (offerIndex === -1) {
            return res.status(400).json({ msg: 'Contract offer not found' });
        }

        player.contractOffers.splice(offerIndex, 1);
        await player.save();

        // Find the team by ID and populate the managers' full names
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Create a notification for the team managers
        const notificationType = 'contract-rejected';
        const notificationTitle = 'Contract Rejected';
        const notificationMessage = `${player.user.fullName} has rejected the contract offer from your team.`;
        const redirectUrl = `/team/${teamId}`; // Adjust this URL format as per your front-end routing

        // Send notifications to all team managers
        for (const manager of team.managers) {
            await createNotification(manager._id, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                playerId: player._id,
                teamId: teamId,
            });
        }

        res.status(200).json({ msg: 'Contract offer rejected successfully' });
    } catch (error) {
        console.error('Error rejecting contract offer:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const getContractOffers = async (req, res) => {
    try {
        const userId = req.user._id;

        const player = await Player.findOne({ user: userId }).select('contractOffers');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        res.status(200).json({ contractOffers: player.contractOffers });
    } catch (error) {
        console.error('Error fetching contract offers:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getTeamContract = async (req, res) => {
    try {
        const userId = req.user._id;

        const player = await Player.findOne({ user: userId }).select('teamContract');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        res.status(200).json({ teamContract: player.teamContract });
    } catch (error) {
        console.error('Error fetching team contract:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

async function getPlayerProfile(req, res) {
    const userId = req.user._id;

    try {
        const playerProfile = await Player.findOne({ user: userId })
            .populate({
                path: 'user',
                select: 'fullName address dateOfBirth phone age gender occupation avatar userType'
            })
            .populate('fans')
            .populate('ratings')
            .exec();

        if (!playerProfile) {
            return res.status(404).json({ message: "Player profile not found" });
        }

        const completeProfile = {
            user: playerProfile.user,
            player: {
                yearsOfExperience: playerProfile.yearsOfExperience,
                hoursPlayedPerWeek: playerProfile.hoursPlayedPerWeek,
                titlesOwn: playerProfile.titlesOwn,
                titlesWithSpecificTeamName: playerProfile.titlesWithSpecificTeamName,
                strikerPositionScore: playerProfile.strikerPositionScore,
                wingerPositionScore: playerProfile.wingerPositionScore,
                midfielderPositionScore: playerProfile.midfielderPositionScore,
                wingDefenderPositionScore: playerProfile.wingDefenderPositionScore,
                centralBackPositionScore: playerProfile.centralBackPositionScore,
                fans: playerProfile.fans,
                ratings: playerProfile.ratings,
                zGold: playerProfile.zGold,
            }
        };

        return res.status(200).json(completeProfile);
    } catch (error) {
        console.error("Error fetching player profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const requestToJoinTeam = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id;

        // Find the player by their user ID
        const player = await Player.findOne({ user: userId }).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already in a team
        if (player.currentTeam) {
            return res.status(400).json({ msg: 'Player is already in a team' });
        }

        // Find the team by the provided team ID
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the player has already requested to join the team
        if (team.joinRequests.includes(player._id)) {
            return res.status(400).json({ msg: 'Join request already sent' });
        }

        // Add the player's ID to the team's joinRequests array
        team.joinRequests.push(player._id);
        await team.save();

        // Send notifications to all team managers
        const notificationType = 'join-request';
        const notificationTitle = 'New Join Request';
        const notificationMessage = `${player.user.fullName} has requested to join your team.`;
        const redirectUrl = `/team-join-requests`; // Adjust this URL format as per your front-end routing

        // Send notifications to all team managers
        for (const manager of team.managers) {
            await createNotification(manager._id, notificationType, notificationTitle, notificationMessage, redirectUrl, {
                playerId: player._id,
                teamId: teamId,
            });
        }

        res.status(200).json({ msg: 'Join request sent successfully' });
    } catch (error) {
        console.error('Error sending join request:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const checkPlayerTeamStatus = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the player by user ID
        const player = await Player.findOne({ user: userId });

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already part of any team
        const team = await Team.findOne({ players: player._id });

        if (team) {
            return res.status(200).json({
                msg: 'Player is already part of a team',
                teamId: team._id,
                teamName: team.name,
                isJoined: true,
            });
        } else {
            return res.status(200).json({ msg: 'Player has not joined any team yet', isJoined: false });
        }
    } catch (error) {
        console.error('Error checking player team status:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getPlayerBySearch, addTeamInvitation, acceptTeamInvitation, acceptContractOffer, fetchTeamInvitations, contractOfferReject, getContractOffers, getTeamContract, rejectTeamInvitation, getPlayerProfile, checkPlayerTeamStatus, requestToJoinTeam
};
