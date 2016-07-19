/**
 * @fileOverview users controller
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-19
 */

var mongoose = require('mongoose');
var User = mongoose.model('user');

module.exports = {
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
