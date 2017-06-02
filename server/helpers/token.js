var express = require('express');
var model = require('../models/user')
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();

module.exports = {
  userLogin: function(req, res, next){
    let token = req.headers.token;
    jwt.verify(token, 'MUSIXMATCH-UH-YEAH', function(err, decoded) {
      if(decoded.role) {
        if (decoded.role === "admin") next();
        else {
          res.send('You are not authorized');
        }
      } else {
        res.send('You are not authorized');
      }
    });
  }
};
