var express = require('express');
var model = require('../models/users')
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();

module.exports = {
  userLogin: function(req, res, next){
    let token = req.headers.token
    if(token){
      let decode = jwt.verify(token, process.env.SECRETPASS);
      if(decode.username){
        next();
      }else{
        res.send('You\'r not Register');
      }
    }
  }
}
