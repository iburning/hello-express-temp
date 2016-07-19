/**
 * @fileOverview users route
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-19
 */

var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/', controller.list);

module.exports = router;
