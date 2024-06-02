const User = require("../models/User");
const Player = require("../models/Player");
const Team = require("../models/Team");
const { createNotification } = require("./notificationController");
const Notification = require("../models/Notification");

const getUserTeams = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        const startIndex = (page - 1) * limit;
        const userId = req.user._id;

        // Find the user by their ID to ensure they exist
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Find the player associated with the user, if any
        const player = await Player.findOne({ user: userId });

        // Construct the query to find teams created by the user, where the user is a manager, or where the user is a player
        const query = {
            $or: [
                { createdBy: userId },
                { managers: userId },
                player ? { players: player._id } : null
            ].filter(Boolean) // Remove null values from the query
        };

        // Get the total count of teams matching the query
        const totalCount = await Team.countDocuments(query);

        // Find teams matching the query with pagination
        const teams = await Team.find(query)
            .select('name teamPoster description _id players')
            .skip(startIndex)
            .limit(limit);

        // Prepare the response object
        const results = {
            totalCount,
            teams,
        };

        // Check if there is a next page
        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllTeams = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        const startIndex = (page - 1) * limit;

        // Get the total count of all teams
        const totalCount = await Team.countDocuments();

        // Find all teams with pagination
        const teams = await Team.find()
            .select('name teamPoster description _id players')
            .skip(startIndex)
            .limit(limit);

        // Prepare the response object
        const results = {
            totalCount,
            teams,
        };

        // Check if there is a next page
        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(results);
    } catch (error) {
        console.log('Error fetching all teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getUserTeamsBySearch = async (req, res) => {
    try {
        const keyword = req.query.search;
        const userId = req.user._id; // Assuming user ID is accessible from the request

        if (!keyword) {
            return res.status(400).json({ msg: 'Search keyword is required' });
        }

        // Construct the query to filter teams based on user criteria
        const query = {
            $and: [
                { $or: [{ createdBy: userId }, { managers: userId }] }, // Match teams created by or managed by the user
                { name: new RegExp(keyword, 'i') } // Match teams whose name matches the keyword
            ]
        };

        // Find teams based on the constructed query and select only the specified fields
        const teams = await Team.find(query)
            .select('name teamPoster description _id players');

        res.status(200).json(teams);
    } catch (error) {
        console.error('Error searching teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }

    // res.end();
};

const getTeamBySearch = async (req, res) => {
    try {
        const keyword = req.query.search;

        if (!keyword) {
            return res.status(400).json({ msg: 'Search keyword is required' });
        }

        const teams = await Team.find({ name: new RegExp(keyword, 'i') }).select('name teamPoster description _id players');

        res.status(200).json(teams);
    } catch (error) {
        console.error('Error searching teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getSingleTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const userId = req.user._id;

        const team = await Team.findById(teamId).populate({
            path: 'players',
            populate: {
                path: 'user',
                select: 'fullName avatar'
            },
            select: 'user teamContract'
        });


        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if the user is a manager of the team
        const isManager = team.managers.some(managerId => managerId.equals(userId));

        // Respond with the team data and isManager field
        res.status(200).json({ team, isManager });
    } catch (error) {
        console.error('Error fetching team details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createTeam = async (req, res) => {
    try {
        // Destructure request body
        const { name, description, teamPoster, socialLinks, location } = req.body;

        // Input validation
        if (!name || !description || !teamPoster || !socialLinks || !location) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Check if team name already exists
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ msg: 'Team name already exists' });
        }

        // Create and save the Team
        const team = new Team({
            name,
            description,
            teamPoster,
            socialLinks,
            location,
            createdBy: req.user._id, // Set the createdBy field to the user's ID
            managers: [req.user._id] // Optionally add the user to the managers list
        });
        await team.save();

        // Send response
        res.status(201).json({ msg: 'Team created successfully', team });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateTeam = async (req, res) => {
    try {
        const { name, description, teamPoster, socialLinks, location } = req.body;
        const teamId = req.params.teamId;
        const userId = req.user._id;

        // Find the team by ID
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the user is a manager or the creator of the team
        if (!team.managers.includes(userId)) {
            return res.status(403).json({ msg: 'Unauthorized access' });
        }

        // Update the team fields
        team.name = name;
        team.description = description;
        team.teamPoster = teamPoster;
        team.socialLinks = socialLinks;
        team.location = location;

        // Save the updated team
        await team.save();

        res.status(200).json({ msg: 'Team updated successfully', team });
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const sendContractOffer = async (req, res) => {
    try {
        // Extract data from request body
        const { playerId, teamId, offerDetails } = req.body;

        // Validate request body
        if (!playerId || !teamId || !offerDetails) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Find the player by ID
        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player already has a team contract
        if (player.teamContract && player.teamContract.team) {
            return res.status(400).json({ msg: 'Player already has a contract with a team' });
        }

        // Check if a contract offer from the same team already exists
        const existingOffer = player.contractOffers.some(offer => offer.team.equals(teamId));
        if (existingOffer) {
            return res.status(400).json({ msg: 'Contract offer already sent by this team' });
        }

        // Create the contract offer object with the current date
        const contractOffer = {
            ...offerDetails,
            team: teamId,
            createdAt: Date.now()
        };

        // Add the contract offer to the player's document
        player.contractOffers.push(contractOffer);
        await player.save();

        // Send notification to the player
        await createNotification(
            player.user,
            'Contract Offer',
            'New Contract Offer',
            'You have received a new contract offer.',
            '/team-contracts', // Update this with the actual path to redirect
            { teamId, offerDetails }
        );

        // Send a response indicating success
        res.status(200).json({ msg: 'Contract offer sent successfully' });
    } catch (error) {
        console.error('Error sending contract offer:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



const acceptTeamJoinRequest = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;
        const userId = req.user._id;

        // Find the team by the provided team ID
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the user is a manager of the team
        const isManager = team.managers.some(manager => manager._id.equals(userId));

        if (!isManager) {
            return res.status(403).json({ msg: 'You are not authorized to accept join requests for this team' });
        }

        // Find the player by the provided player ID
        const player = await Player.findById(playerId).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player has a pending join request for the team
        if (!team.joinRequests.includes(playerId)) {
            return res.status(400).json({ msg: 'This player has not requested to join this team' });
        }

        // Remove the player's ID from the team's joinRequests array and push in team's players array
        const index = team.joinRequests.indexOf(playerId);
        team.joinRequests.splice(index, 1);
        team.players.push(playerId);

        // Update the player's current team with the accepted team
        player.currentTeam = teamId;

        // Save changes to both team and player
        await Promise.all([team.save(), player.save()]);

        // Create a notification for the player
        const notification = new Notification({
            userId: player.user._id,
            type: 'join-request-accepted',
            title: 'Join Request Accepted',
            message: `Your join request for ${team.name} has been accepted.`,
            redirectUrl: `/team/${teamId}`,
            additionalData: {
                playerId: player._id,
                teamId: teamId,
            }
        });
        await notification.save();

        res.status(200).json({ msg: 'Join request accepted successfully' });
    } catch (error) {
        console.error('Error accepting join request:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const rejectTeamJoinRequest = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;

        const userId = req.user._id;

        // Find the team by the provided team ID
        const team = await Team.findById(teamId).populate('managers', 'fullName');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the user is a manager of the team
        const isManager = team.managers.some(manager => manager._id.equals(userId));

        if (!isManager) {
            return res.status(403).json({ msg: 'You are not authorized to reject join requests for this team' });
        }

        // Find the player by the provided player ID
        const player = await Player.findById(playerId).populate('user', 'fullName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player has a pending join request for the team
        if (!team.joinRequests.includes(playerId)) {
            return res.status(400).json({ msg: 'This player has not requested to join this team' });
        }

        // Remove the player's ID from the team's joinRequests array
        const index = team.joinRequests.indexOf(playerId);
        team.joinRequests.splice(index, 1);
        await team.save();

        // Create a notification for the player
        const notification = new Notification({
            userId: player.user._id,
            type: 'join-request-rejected',
            title: 'Join Request Rejected',
            message: `Your join request for ${team.name} has been rejected.`,
            redirectUrl: '/notifications',
            additionalData: {
                playerId: player._id,
                teamId: teamId,
            }
        });
        await notification.save();

        res.status(200).json({ msg: 'Join request rejected successfully' });
    } catch (error) {
        console.error('Error rejecting join request:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getTeamJoinRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find teams where the user is a manager
        const teams = await Team.find({ managers: userId })
            .populate({
                path: 'joinRequests',
                select: '_id',
                populate: {
                    path: 'user',
                    select: 'fullName avatar'
                }
            });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ msg: 'No teams found for this manager' });
        }

        // Extract the relevant data from the populated joinRequests for all teams
        const joinRequests = teams.flatMap(team =>
            team.joinRequests.map(player => ({
                teamId: team._id,
                teamName: team.name,
                playerId: player._id,
                fullName: player.user.fullName,
                avatar: player.user.avatar
            }))
        );

        res.status(200).json({ joinRequests });
    } catch (error) {
        console.error('Error fetching team join requests:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getUserTeams, getSingleTeam, createTeam, updateTeam, sendContractOffer, getAllTeams, getUserTeamsBySearch, getTeamBySearch, acceptTeamJoinRequest, rejectTeamJoinRequest, getTeamJoinRequests
};
