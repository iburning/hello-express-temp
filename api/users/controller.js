/**
 * @fileOverview users controller
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-19
 */

// var mongoose = require('mongoose');
// var User = mongoose.model('user');
var service = require('./service');
var fields = 'username nickname avatar';

module.exports = {
  create: function (req, res, next) {
    validate(req.body, function (err, data) {
      if (err) {
        next(err);
        return;
      }

      service.create(data, function (err, user) {
        if (err) {
          next(err);
          return;
        }

        res.json({
          status: 200,
          message: 'success'
        });
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

  detail: function (req, res, next) {
    service.findOne({
      _id: req.params._id
    }, fields, function (err, user) {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        next({
          status: 404,
          message: 'not found'
        });
        return;
      }

      res.json({
        status: 200,
        data: user
      });
    });
  },

  list: function (req, res, next) {
    service.findList({}, fields, {
      limit: 10,
      page: 1
    }, function (err, list, total, page, pages) {
      res.json({
        status: 200,
        message: 'success',
        data: {
          list: list,
          total: total,
          page: page,
          pages: pages
        }
      });
    });
  }
};
