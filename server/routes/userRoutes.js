const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');
const authMiddleware = require('../middleware/middleware');

router.get('/', authMiddleware, userController.getUser);
router.get('/my-created-teams', authMiddleware, userController.getUserTeams);
router.get('/get-check-manager-teams', authMiddleware, userController.checkUserIsManagerAndGetTeamNames);


module.exports = router;