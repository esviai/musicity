var model = require('../models/users');
var bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = process.env.SALT;

module.exports = {
  createData: function(req, res, next){
    model.create({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password,)
    }, function(err, data){
      if(!err){
        res.send(data);
      } else {
        res.send(err);
      }
    })
  },
  findAll: function(req, res, next){
    model.find({}, function(err, data){
      if(!err){
        res.send(data);
      } else {
        res.send(err);
      }
    })
  },
  findOne: function(req, res, next){
    model.findById(req.params.id, function(err, data){
      if(!err){
        res.send(data);
      } else {
        res.send(err);
      }
    })
  },
  updateById: function(req, res, next){
    model.findByIdAndUpdate(req.params.id, function(err, data){
      if(!err){
        res.send('updated!\n'+data);
      } else {
        res.send(err);
      }
    })
  },
  deleteById: function(req, res, next){
    model.findByIdAndRemove(req.params.id, function(err, data){
      if(!err){
        res.send('data deleted!\n'+data);
      } else {
        res.send(err);
      }
    })
  }
}
