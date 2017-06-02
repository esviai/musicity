var router = require('express').Router();
var control = require('../controllers/user');
var midleware = require('../helper/token');

router.get('/', control.findAll);

router.post('/', middleware.userLogin,control.findOrCreateUser);

router.get('/:id', midleware.userLogin, control.findOne);

router.patch('/:id', midleware.userLogin, control.updateUser);

router.delete('/:id', midleware.userLogin, control.deleteUser);

router.post('/signin', control.signin);

router.post('/signup', control.createUser);

module.exports = router;
