var router = require('express').Router();
var control = require('../controllers/user');
var midleware = require('../helper/token');

router.get('/', midleware.userLogin, control.findAll);

router.post('/', midleware.userLogin, control.createUser);

router.get('/:id', midleware.userLogin, control.findOne);

router.patch('/:id', midleware.userLogin, control.updateUser);

router.delete('/:id', midleware.userLogin, control.deleteUser);

router.post('/signin', control.signin);

router.post('/signup', control.createUser);

module.exports = router;
