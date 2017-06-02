const express = require('express');
const router = express.Router();
var control = require('../controllers/user');

router.get('/', function(req, res) {
  res.send("Our site is alive, yeay..");
});

router.post('/signin', control.signin);

router.post('/signup', control.createUser);

module.exports = router;
