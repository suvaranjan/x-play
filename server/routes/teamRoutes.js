const express = require('express');
const router = express.Router();
const teamController = require('../controller/teamController');
const authMiddleware = require('../middleware/middleware');

router.get('/all-teams', authMiddleware, teamController.getAllTeams);
router.get('/search-my-teams', authMiddleware, teamController.getUserTeamsBySearch);
router.get('/search-all-teams', authMiddleware, teamController.getTeamBySearch);
router.get('/my-teams', authMiddleware, teamController.getUserTeams);
router.put('/update-team/:teamId', authMiddleware, teamController.updateTeam);
router.post('/contract-offer-player', authMiddleware, teamController.sendContractOffer);
router.post('/team-join-req-reject', authMiddleware, teamController.rejectTeamJoinRequest);
router.post('/team-join-req-accept', authMiddleware, teamController.acceptTeamJoinRequest);
router.get('/get-join-requests', authMiddleware, teamController.getTeamJoinRequests);
router.post('/create-team', authMiddleware, teamController.createTeam);
router.get('/:teamId', authMiddleware, teamController.getSingleTeam);

module.exports = router;
