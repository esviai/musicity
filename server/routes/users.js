var router = require('express').Router();
var control = require('../controllers/user');
var midleware = require('../helpers/token');

router.get('/', midleware.userLogin, control.findAll);

router.post('/', control.findOrCreateUser);

router.get('/:id', midleware.userLogin, control.findOne);

router.put('/:id', midleware.userLogin, control.updateUser);

router.delete('/:id', midleware.userLogin, control.deleteUser);

module.exports = router;
