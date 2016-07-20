/**
 * @fileOverview users test
 * @author: burning <www.cafeinit.com>
 * @date: 2016-07-20
 */

var request = require('request');
var apiBase = 'http://localhost:3000/api/';

create({
  username: 'test01',
  nickname: 'TT'
});

function save(data) {
  request.post({
    url: apiBase + 'users',
    form: data
  }, function (err, response, body) {
    console.log('create user', err, body);
  });
}
