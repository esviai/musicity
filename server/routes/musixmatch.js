const express = require('express');
const router = express.Router();
const musixmatchController = require('../controllers/musixmatch_controller');

router.get('/tracks', musixmatchController.getTracks);
router.get('/artists', musixmatchController.getArtists);
router.get('/lyrics', musixmatchController.getLyrics);

module.exports = router;
