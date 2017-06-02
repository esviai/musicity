var router = require('express').Router();
var control = require('../controllers/user');

router.get('/', control.findAll);

router.post('/', control.createData);

router.get('/:id', control.findOne);

router.patch('/:id', control.updateById);

router.delete('/:id', control.deleteById);

module.exports = router;
