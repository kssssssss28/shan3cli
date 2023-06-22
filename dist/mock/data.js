"use strict";

var _mockjs = _interopRequireDefault(require("mockjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// GET请求
_mockjs["default"].mock('/api/getData', 'get', function () {
  return _mockjs["default"].mock({
    'data|10': [{
      'name': '@cname',
      'age|20-30': 1,
      'id|+1': 1
    }]
  });
});

// POST请求
_mockjs["default"].mock('/api/postData', 'post', function (options) {
  var body = options.body;
  return _mockjs["default"].mock({
    'data': "hello, ".concat(JSON.parse(body).name, "!")
  });
});