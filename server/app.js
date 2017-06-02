var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/musicity';
mongoose.connect(url, function(err, res){
  if(!err){
    console.log('sucsess!');
  } else {
    console.log(err);
  }
});

var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);

app.listen(3000, function(req, res){
  console.log('connected into port 3000');
});

module.exports = app;
