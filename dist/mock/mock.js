"use strict";

var _mockjs = _interopRequireDefault(require("mockjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// example 相关
_mockjs["default"].mock("/api/users", "get", function () {
  return _mockjs["default"].mock({
    status: "200",
    msg: "请求成功",
    "data|3": [{
      name: "@cname",
      // Mock.Random.cname(),
      age: "@integer(20,50)"
    }]
  });
});