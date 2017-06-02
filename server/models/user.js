var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  loginMethod: String,
  keywords: [String],
  songs: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
