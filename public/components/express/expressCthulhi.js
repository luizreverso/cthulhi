"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressAppSingleton = require("../utils/expressAppSingleton");

var _expressAppSingleton2 = _interopRequireDefault(_expressAppSingleton);

var _pathsSingleton = require("../utils/pathsSingleton");

var _pathsSingleton2 = _interopRequireDefault(_pathsSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Express = function () {
	function Express() {
		_classCallCheck(this, Express);

		this.setup();
	}

	_createClass(Express, [{
		key: "getApp",
		value: function getApp() {
			return _expressAppSingleton2.default;
		}
	}, {
		key: "setRoutes",
		value: function setRoutes(path, router) {
			_expressAppSingleton2.default.use(path, router);
		}
	}, {
		key: "startServer",
		value: function startServer() {
			var port = arguments.length <= 0 || arguments[0] === undefined ? 8080 : arguments[0];

			_expressAppSingleton2.default.use("/", _express2.default.static(_pathsSingleton2.default.root + "/dist/"));

			_expressAppSingleton2.default.listen(port);
		}
	}, {
		key: "setup",
		value: function setup() {
			this.setupHandlebars();
			this.setupViewEngine();
			this.setupThirdParties();
			this.setupSession();
			this.setupSecurity();
			this.setupReactRouterMiddleware();
		}
	}, {
		key: "setupHandlebars",
		value: function setupHandlebars() {
			_expressAppSingleton2.default.engine("handlebars", (0, _expressHandlebars2.default)({
				defaultLayout: "main",
				helpers: {
					partial: function partial(name) {
						return name;
					}
				}
			}));
		}
	}, {
		key: "setupViewEngine",
		value: function setupViewEngine() {
			_expressAppSingleton2.default.set("view engine", "handlebars");
		}
	}, {
		key: "setupThirdParties",
		value: function setupThirdParties() {
			_expressAppSingleton2.default.use((0, _morgan2.default)("dev"));
			_expressAppSingleton2.default.use((0, _cookieParser2.default)());
			_expressAppSingleton2.default.use((0, _bodyParser2.default)());
		}
	}, {
		key: "setupSession",
		value: function setupSession() {
			_expressAppSingleton2.default.use((0, _expressSession2.default)({ secret: "teste" }));
		}
	}, {
		key: "setupSecurity",
		value: function setupSecurity() {
			_expressAppSingleton2.default.use(_passport2.default.initialize());
			_expressAppSingleton2.default.use(_passport2.default.session());
			_expressAppSingleton2.default.set("tokenSecret", "teste");
		}
	}, {
		key: "setupReactRouterMiddleware",
		value: function setupReactRouterMiddleware() {
			// reactRouterMiddleware(app, reactRoutes);
		}
	}]);

	return Express;
}();

exports.default = Express;