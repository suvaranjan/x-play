const express = require('express');
const router = express.Router();
const playersController = require('../controller/playersController');
const authMiddleware = require('../middleware/middleware');

router.get('/search-players', authMiddleware, playersController.getPlayerBySearch);
router.get('/profile', authMiddleware, playersController.getPlayerProfile);
router.post('/send-invite', authMiddleware, playersController.addTeamInvitation);
router.post('/accept-team-invite', authMiddleware, playersController.acceptTeamInvitation);
router.post('/reject-team-invite', authMiddleware, playersController.rejectTeamInvitation);
router.get('/team-invitations', authMiddleware, playersController.fetchTeamInvitations);
router.post('/reject-contract-offer', authMiddleware, playersController.contractOfferReject);
router.post('/accept-contract-offer', authMiddleware, playersController.acceptContractOffer);
router.get('/team-contract', authMiddleware, playersController.getTeamContract);
router.get('/contract-offers', authMiddleware, playersController.getContractOffers);
router.get('/my-contracts', authMiddleware, playersController.getTeamContract);
router.get('/check-player-team-status', authMiddleware, playersController.checkPlayerTeamStatus);
router.post('/join-req-to-team', authMiddleware, playersController.requestToJoinTeam);


module.exports = router;
