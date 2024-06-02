const Notification = require('../models/Notification');

// Create a new notification
const createNotification = async (userId, type, title, message, redirectUrl, additionalData = {}) => {
    try {
        const notification = new Notification({
            userId,
            type,
            title,
            message,
            redirectUrl,
            additionalData
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Server Error');
    }
};

const countNewNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const newNotificationCount = await Notification.countDocuments({ userId, read: false });

        res.status(200).json({ newNotification: newNotificationCount });
    } catch (error) {
        console.error('Error counting new notifications:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ msg: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.updateMany({ userId, read: false }, { $set: { read: true } });

        res.status(200).json({ msg: 'All notifications marked as read' });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        res.status(200).json({ msg: 'Notification deleted', notification });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete all notifications for a user
const deleteAllNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ userId });

        res.status(200).json({ msg: 'All notifications deleted' });
    } catch (error) {
        console.error('Error deleting all notifications:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = {
    createNotification,
    markAsRead,
    getUserNotifications,
    deleteNotification,
    markAllAsRead,
    deleteAllNotifications,
    countNewNotifications
};

