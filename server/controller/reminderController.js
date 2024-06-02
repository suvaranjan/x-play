const User = require("../models/User");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Reminder = require("../models/Reminder");
const { createNotification } = require("./notificationController");

const sendReminder = async (req, res) => {
    try {
        const { team, title, message } = req.body.data; // Removed "recipient"
        const userId = req.user._id;

        // Find the team and check if the user is a manager
        const teamDoc = await Team.findById(team).populate('managers players');
        if (!teamDoc) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        const isManager = teamDoc.managers.some(manager => manager.equals(userId));
        if (!isManager) {
            return res.status(403).json({ msg: 'You are not authorized to send reminders for this team' });
        }

        // Create a reminder
        const newReminder = new Reminder({
            teamId: teamDoc._id,
            managerId: userId,
            title,
            message,
        });

        await newReminder.save();

        // Add reminder to the team's reminders array
        teamDoc.reminders.push(newReminder._id);
        await teamDoc.save();

        // Determine recipients and send notifications to all players and managers
        const notificationRecipients = [
            ...teamDoc.players.map(player => player.user),
            ...teamDoc.managers
        ];

        // Send notifications
        const notificationPromises = notificationRecipients.map(async recipient => {
            await createNotification(
                recipient._id,
                'reminder',
                `Reminder from ${teamDoc.name}`,
                `You received a reminder from Team: ${teamDoc.name}`,
                '/team-reminder'
            );
        });

        await Promise.all(notificationPromises);

        res.status(200).json({ msg: 'Reminder sent successfully' });
    } catch (error) {
        console.error('Error sending reminder:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// const getReminders = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const player = await Player.findOne({ user: userId })

//         // Find teams where the user is a player or manager
//         const teams = await Team.find({
//             $or: [{ "players": player ? player._id : null }, { "managers": userId }]
//         });

//         // Extract team IDs
//         const teamIds = teams.map(team => team._id);

//         // Find reminders for each team ID
//         const reminders = await Reminder.find({ teamId: { $in: teamIds } })
//             .populate({
//                 path: 'managerId',
//                 select: 'fullName' // Only select the fullName field
//             });

//         // Prepare response
//         const remindersData = reminders.map(reminder => {
//             const team = teams.find(team => team._id.equals(reminder.teamId));
//             const senderName = reminder.managerId.fullName; // Access the fullName directly from the populated managerId field
//             return {
//                 teamName: team.name,
//                 sender: senderName,
//                 title: reminder.title,
//                 message: reminder.message,
//                 date: reminder.createdAt,
//             };
//         });


//         res.status(200).json(remindersData);
//     } catch (error) {
//         console.error('Error fetching reminders:', error);
//         res.status(500).json({ msg: 'Server error' });
//     }
// };


const getReminders = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        const player = await Player.findOne({ user: userId });

        // Find teams where the user is a player or manager
        const teams = await Team.find({
            $or: [{ "players": player ? player._id : null }, { "managers": userId }]
        });

        // Extract team IDs
        const teamIds = teams.map(team => team._id);

        // Find total count of reminders
        const totalCount = await Reminder.countDocuments({ teamId: { $in: teamIds } });

        // Find reminders with pagination and sorting by newest first
        const reminders = await Reminder.find({ teamId: { $in: teamIds } })
            .populate({
                path: 'managerId',
                select: 'fullName' // Only select the fullName field
            })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .skip((page - 1) * limit)
            .limit(limit);

        // Prepare response
        const remindersData = reminders.map(reminder => {
            const team = teams.find(team => team._id.equals(reminder.teamId));
            const senderName = reminder.managerId.fullName; // Access the fullName directly from the populated managerId field
            return {
                teamName: team.name,
                sender: senderName,
                title: reminder.title,
                message: reminder.message,
                date: reminder.createdAt,
            };
        });

        // Send response with pagination metadata
        res.status(200).json({
            totalCount,
            reminders: remindersData,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



module.exports = {
    sendReminder, getReminders
};

