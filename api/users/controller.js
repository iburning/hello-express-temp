/**
 * @fileOverview users controller
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-19
 */

var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports = {
  save: function (req, res, next) {
    console.log('body', req.body);
    validate(req.body, function (err, data) {
      if (err) {
        next(err);
        return;
      }

      var user = new User(data);

      user.save(function (err, user) {
        if (err) {
          next(err);
          return;
        }

        res.json(user);
      });
    });

    function validate(input, done) {
      var output = {};
      var error = [];

      if (input.username) {
        output.username = input.username;
      }
      else {
        error.push({
          name: 'username',
          tip: '请输入username'
        });
      }

      if (error.length) {
        done({
          status: 400,
          info: error
        });
      }
      else {
        done(null, output);
      }
    }
  },


  list: function (req, res, next) {
    User.find({}, function (err, list) {
      if (err) {
        next(err);
        return;
      }

      res.json(list);
    });
  }
};
