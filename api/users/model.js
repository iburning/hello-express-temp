/**
 * @fileOverview users model
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-19
 */

// var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, default: '' },
  salt: { type: String, default: '' },
  create_at: { type: Date, default: Date.now },
  nickname: { type: String, default: '' },
  avatar: { type: String, default: '' }
});

module.exports = mongoose.model('user', schema);
