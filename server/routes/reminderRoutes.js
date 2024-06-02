const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminderController');
const authMiddleware = require('../middleware/middleware');

router.post('/send-reminder', authMiddleware, reminderController.sendReminder);
router.get('/', authMiddleware, reminderController.getReminders);


module.exports = router;
