/**
 * @fileOverview CIService
 * @author: burning <www.cafeinit.com>
 * @date: 2016-05-14
 */

var CIService = function (model) {
  this.init(model);
};

module.exports = CIService;

CIService.prototype = {
  constructor: CIService,

  init: function (model) {
    this.model = model;
  },

  findOne: function (conditions, fields, options, callback) {
    this._findOne(conditions, fields, options, callback);
  },

  _findOne: function (conditions, fields, options, callback) {
    this.model.findOne(conditions, fields, options, callback);
  },

  find: function (conditions, fields, options, callback) {
    this._find(conditions, fields, options, callback);
  },

  _find: function (conditions, fields, options, callback) {
    this.model.find(conditions, fields, options, callback);
  },

  findList: function (argument) {
    var conditions = null;
    var fields = null;
    var options = null;
    var callback = null;

    if (arguments.length === 2) {
      conditions = arguments[0];
      callback = arguments[1];
    } else if (arguments.length === 3) {
      conditions = arguments[0];
      if (typeof arguments[1] === 'string') {
        fields = arguments[1];
      }
      else {
        options = arguments[1];
      }
      callback = arguments[2];
    }
    else if (arguments.length === 4) {
      conditions = arguments[0];
      fields = arguments[1];
      options = arguments[2];
      callback = arguments[3];
    }

    this._findList(conditions, fields, options, callback);
  },

  _findList: function (conditions, fields, options, callback) {
    var self = this;
    var page = 1;
    var limit = 10;

    if (options) {
      limit = options.limit || limit;
      if (options.limit <= 0) {
        limit = options.limit = 10;
      }
      else if (options.limit > 100) {
        limit = options.limit = 100;
      }
      page = (options.page || page) - 1;
      page = (page < 0) ? 0 : page;
      options.skip = limit * page;
      delete options.page;
    }
    else {
      options = {
        limit: limit
      }
    }

    this.model.count(conditions, function (err, total) {
      if (err) {
        callback(err);
        return;
      }

      self.model.find(conditions, fields, options, function (err1, list) {
        if (err1) {
          callback(err1);
          return;
        }

        callback(err1, list, total, (limit * (page + 1) >= total));
      });
    });
  },

  create: function (data, callback) {
    this._create(data, callback);
  },

  _create: function (data, callback) {
    this.model.create(data, callback);
  },

  save: function (model, callback) {
    this._save(model, callback);
  },

  _save: function (model, callback) {
    model.save(callback);
  },

  update: function (conditions, update, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (typeof options.new !== 'boolean') {
      options.new = true;
    }

    this._update(conditions, update, options, callback);
  },

  _update: function (conditions, update, options, callback) {
    this.model.findOneAndUpdate(conditions, update, options, callback);
  },

  remove: function (conditions, options, callback) {
    this._remove(conditions, options, callback);
  },

  _remove: function (conditions, options, callback) {
    this.model.findOneAndRemove(conditions, options, callback);
  }
};
