const express = require('express');
const router = express.Router();
const {
    createNotification,
    markAsRead,
    markAllAsRead,
    getUserNotifications,
    deleteNotification,
    deleteAllNotifications,
    countNewNotifications
} = require('../controller/notificationController');
const authMiddleware = require('../middleware/middleware');

// Route to get all notifications for a user
router.get('/', authMiddleware, getUserNotifications);

router.get('/new-notification-count', authMiddleware, countNewNotifications);

// Route to mark a notification as read
router.put('/mark-as-read/:notificationId', authMiddleware, markAsRead);

// Route to mark all notifications as read
router.put('/mark-all-as-read', authMiddleware, markAllAsRead);

// Route to delete a notification
router.delete('/:notificationId', authMiddleware, deleteNotification);

// Route to delete all notifications for a user
router.delete('/', authMiddleware, deleteAllNotifications);

module.exports = router;
