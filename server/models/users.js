var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/musicity';
mongoose.connect(url);

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  token: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    require: true
  },
  songs: {
    type: [String],
    require: true
  }
});

var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
