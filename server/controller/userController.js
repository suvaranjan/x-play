// controllers/userController.js
const User = require('../models/User');
const Team = require('../models/Team');

const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        // Fetch all users, excluding the password field
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Send the user data in the response
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



const getUserTeams = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find teams where the manager array contains the user's ID
        const teams = await Team.find({ managers: userId })
            .select('name teamPoster')

        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const checkUserIsManagerAndGetTeamNames = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find teams where the user is a manager
        const teams = await Team.find({ managers: userId }).select('name _id');

        // If no teams are found, the user is not a manager
        if (teams.length === 0) {
            return res.status(403).json({ isManager: false, msg: 'You are not a manager of any team' });
        }

        // Collect team names and IDs in an array
        const teamList = teams.map(team => ({
            teamId: team._id,
            teamName: team.name
        }));

        // Send response
        res.status(200).json(teamList);
    } catch (error) {
        console.error('Error checking user manager status and fetching team names:', error);
        res.status(500).json({ isManager: 'Server error' });
    }
};

module.exports = {
    getUser, getUserTeams, checkUserIsManagerAndGetTeamNames
};
