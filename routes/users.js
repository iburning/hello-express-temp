/**
 * @fileOverview users router
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-08
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');


// Sets useful variables for your templates
router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  // res.locals.errors = req.flash('error');
  // res.locals.infos = req.flash('info');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
    .sort({ create_at: 'descending' })
    .exec(function (err, users) {
      if (err) {
        return next(err);
      }

      res.json(users);
    });
  // res.send('respond with a resource');
});

module.exports = router;
