var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  createUser: function(req, res, next){
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      User.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        loginMethod: req.body.login || 'web'
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
    User.findOne({
      username: req.body.username
    }, function(err, data){
      console.log(data);
      if(!err && data){
        if(bcrypt.compareSync(req.body.password, data.password)){
          let token = jwt.sign({
            email: data.email,
            username: data.username,
            loginMethod: data.loginMethod || 'web'
          }, process.env.SECRETPASS);
          res.send('log in berhasil!\n'+token);
        } else {
          res.send('log in gagal!');
        }
      } else {
        res.send('anda belum terdaftar!!');
      }
    })
    // User.findOne({
    //     username: req.body.username
    //   })
    // .then((data)=>{
    //   if(bcrypt.compareSync(req.body.password, data.dataValues.password)){
    //     let token = jwt.sign({
    //       email: data.dataValues.email,
    //       username: data.dataValues.username,
    //       loginMethod: data.dataValues.loginMethod || 'web'
    //     }, process.env.SECRETPASS);
    //     res.send('log in berhasil : '+token);
    //   }else{
    //     res.send('login gagal')
    //   }
    // })
    // .catch((err)=>{
    //   res.send(err)
    // })
  }
};
