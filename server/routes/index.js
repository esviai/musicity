const express = require('express');
const router = express.Router();
var control = require('../controllers/user');

router.get('/', (req,res) => {
    res.send('alive');
});

router.post('/signin',control.signin);

router.post('/signup', control.createUser);

module.exports = router;
