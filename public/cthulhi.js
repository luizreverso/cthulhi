"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressCthulhi = require("./components/express/expressCthulhi");

var _expressCthulhi2 = _interopRequireDefault(_expressCthulhi);

var _middlewareController = require("./components/middlewares/middlewareController");

var _middlewareController2 = _interopRequireDefault(_middlewareController);

var _controllerController = require("./components/controllers/controllerController");

var _controllerController2 = _interopRequireDefault(_controllerController);

var _MongoController = require("./components/mongo/MongoController");

var _MongoController2 = _interopRequireDefault(_MongoController);

var _routes = require("./components/routes/routes");

var _routes2 = _interopRequireDefault(_routes);

var _pathsSingleton = require("./components/utils/pathsSingleton");

var _pathsSingleton2 = _interopRequireDefault(_pathsSingleton);

var _rawCthulhiConfigSingleton = require("./components/utils/rawCthulhiConfigSingleton");

var _rawCthulhiConfigSingleton2 = _interopRequireDefault(_rawCthulhiConfigSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = undefined;

var Cthulhi = function () {
	function Cthulhi() {
		_classCallCheck(this, Cthulhi);

		express = new _expressCthulhi2.default();
	}

	_createClass(Cthulhi, [{
		key: "config",
		value: function config(_config) {
			this.setReactComponentsPath(_config.paths.reactComponents);
			this.configMiddlewares(_config.middlewares);
			this.configControllers(_config.controllers);
			this.configRoutes(_config.routes);
			this.configMongo(_config.mongo);
		}
	}, {
		key: "setRootPath",
		value: function setRootPath(dirname) {
			_pathsSingleton2.default.root = dirname;
		}
	}, {
		key: "setReactComponentsPath",
		value: function setReactComponentsPath(path) {
			_pathsSingleton2.default.reactComponents = path;
		}
	}, {
		key: "configMiddlewares",
		value: function configMiddlewares(middlewares) {
			var middleware = new _middlewareController2.default(middlewares);
			middleware.configMiddlewares();
		}
	}, {
		key: "configControllers",
		value: function configControllers(controllers) {
			var controller = new _controllerController2.default(controllers);
			controller.configControllers();
		}
	}, {
		key: "configRoutes",
		value: function configRoutes(rawRoutes) {
			_rawCthulhiConfigSingleton2.default.routes = rawRoutes;
			var routes = new _routes2.default(rawRoutes, express);
			var router = routes.createRootRoutes();
		}
	}, {
		key: "configMongo",
		value: function configMongo(config) {
			var mongo = new _MongoController2.default();
			mongo.connectMongo(config);
			// mongo.createSchemas(config.models);
		}
	}, {
		key: "startServer",
		value: function startServer() {

			express.startServer();
		}
	}]);

	return Cthulhi;
}();

exports.default = Cthulhi;