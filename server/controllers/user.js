var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  findOrCreateUser: function(req,res,next) {
    User.findOne({email: req.body.email}, (err,user) => {
      if (user) {
        res.send('user exists');
      }
      else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          User.create({
            name: req.body.name,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            loginMethod: req.body.loginMethod,
          }, function(error, user){
            if(!err){
              res.send(user);
            } else {
              res.send(error);
            }
          });
        });
      }
    });
  },
  createUser: function(req, res, next){
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      User.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        loginMethod: "web",
        role: "user"
      }, function(err, user){
        if(!err){
          res.send(user);
        } else {
          res.send(err);
        }
      });
    });
  },
  findAll: function(req, res, next){
    User.find(function(err, users){
      if(!err){
        res.send(users);
      } else {
        res.send(err);
      }
    });
  },
  findOne: function(req, res, next){
    User.findById(req.params.id, function(err, user){
      if(!err){
        res.send(user);
      } else {
        res.send(err);
      }
    });
  },
  updateUser: function(req, res, next){
    User.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, user){
      if(!err){
        res.send('updated!\n'+user);
      } else {
        res.send(err);
      }
    });
  },
  deleteUser: function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err, user){
      if(!err){
        res.send('data deleted!\n'+user);
      } else {
        res.send(err);
      }
    });
  },
  updateSearch: function(req,res,next) {
    User.findById(req.params.id, (err, user) => {
      if (err) res.send(err);
      else {
        if (User.keywords.includes(req.body.keyword)) {
          if (User.songs.includes(req.body.song)) {
            res.send('Keyword and song are already in the database');
          }
          else {
            User.songs.push(req.body.song);
            res.send('Song is inserted into database');
          }
        }
        else {
          User.keywords.push(req.body.keyword);
          if (User.songs.includes(req.body.song)) {
            res.send('Keyword is inserted into database');
          }
          else {
            User.songs.push(req.body.song);
            res.send('Keyword and song are inserted into the database');
          }
        }
      }
    });
  },
  signin: function(req, res, next){
    User.findOne({email: req.body.email}, (err,user) => {
      if (user.email === req.body.email) {
        bcrypt.compare(req.body.password, user.password)
          .then ((result) => {
            if (result) {
              var token = jwt.sign({email: user.email,username: user.username,loginMethod: user.loginMethod, role: user.role}, 'MUSIXMATCH-UH-YEAH');
              res.send(token);
            }
            else {
              res.send('username/password is wrong');
            }
          });
      }
    });
  }
};
