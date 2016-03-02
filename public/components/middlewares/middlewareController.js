"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _middlewaresSingleton = require("../utils/middlewaresSingleton");

var _middlewaresSingleton2 = _interopRequireDefault(_middlewaresSingleton);

var _pathsSingleton = require("../utils/pathsSingleton");

var _pathsSingleton2 = _interopRequireDefault(_pathsSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Middleware = function () {
	function Middleware(rawMiddlewares) {
		_classCallCheck(this, Middleware);

		this.rawMiddlewares = rawMiddlewares;
	}

	_createClass(Middleware, [{
		key: "configMiddlewares",
		value: function configMiddlewares() {
			for (var key in this.rawMiddlewares) {
				var raw = this.rawMiddlewares[key];
				var middleware = this.setupMiddleware(raw);
				_middlewaresSingleton2.default[key] = middleware;
			}
		}
	}, {
		key: "setupMiddleware",
		value: function setupMiddleware(raw) {
			var path = _pathsSingleton2.default.root + raw.path + raw.controller;
			var middlewareController = require(path);
			return middlewareController[raw.action];
		}
	}]);

	return Middleware;
}();

exports.default = Middleware;