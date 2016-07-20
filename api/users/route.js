/**
 * @fileOverview users route
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-20
 */

var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/', controller.list);
router.get('/:_id', controller.detail);
router.post('/', controller.create);

module.exports = router;
