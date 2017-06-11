'use strict'
var express = require('express');
var model = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();

module.exports = {
  userLogin: function(req, res, next){
    if(req.headers.token) {
      let token = req.headers.token;
      jwt.verify(token, 'MUSIXMATCH-UH-YEAH', function(err, decoded) {
        if(decoded) {
          if (decoded.role === "admin") next();
          else {
            res.send('You are not authorized');
          }
        } else {
          res.send('You are not authorized');
        }
      });
    }
    else {
      res.send('You are not authorized');
    }
  }
};
