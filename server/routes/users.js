var router = require('express').Router();
var control = require('../controllers/user');

router.get('/', control.findAll);

router.post('/', control.findOrCreateUser);

router.get('/:id', control.findOne);

router.patch('/:id', control.updateUser);

router.delete('/:id', control.deleteUser);

module.exports = router;
