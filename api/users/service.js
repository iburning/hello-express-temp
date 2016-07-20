/**
 * @fileOverview users service
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-20
 */

var CIService = require('../ci/CIService');
var model = require('./model');
var service = new CIService(model);

module.exports = service;
