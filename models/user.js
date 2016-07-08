/**
 * @fileOverview user model
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-08
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var SALT_FACTOR = 10;

var schema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  nickname: { type: String, default: '' },
  bio: { type: String, default: '' }
});


// A do-nothing function for use with the bcrypt module
var noop = function () {
  // ...
};


schema.pre('save', function (done) {
  var user = this;

  if (!user.isModified('password')) {
    return done();
  }

  bcrypt.getSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err);
    }

    bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
      if (err) {
        return done(err);
      }

      user.password = hashedPassword;
      done();
    });
  })
});


schema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};


schema.methods.name = function () {
  return this.nickname || this.username;
};

module.exports = mongoose.model('user', schema);
