"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _expressAppSingleton = require("../utils/expressAppSingleton");

var _expressAppSingleton2 = _interopRequireDefault(_expressAppSingleton);

var _middlewaresSingleton = require("../utils/middlewaresSingleton");

var _middlewaresSingleton2 = _interopRequireDefault(_middlewaresSingleton);

var _controllersSingleton = require("../utils/controllersSingleton");

var _controllersSingleton2 = _interopRequireDefault(_controllersSingleton);

var _rawCthulhiConfigSingleton = require("../utils/rawCthulhiConfigSingleton");

var _rawCthulhiConfigSingleton2 = _interopRequireDefault(_rawCthulhiConfigSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
	function Route(routeName, rawRoute) {
		_classCallCheck(this, Route);

		this.name = routeName;
		this.route = rawRoute;
	}

	_createClass(Route, [{
		key: "configExpressRoute",
		value: function configExpressRoute(router) {
			if (this.route.type == "post") {
				router.post.apply(router, [this.getPath()].concat(_toConsumableArray(this.getMiddlewares()), [this.getController()]));
			} else {
				router.get.apply(router, [this.getPath()].concat(_toConsumableArray(this.getMiddlewares()), [this.getController()]));
			}

			if (this.route.routes) {
				this.configRoutes(router);
			}
			return router;
		}
	}, {
		key: "getPath",
		value: function getPath() {
			return this.route.path;
		}
	}, {
		key: "getMiddlewares",
		value: function getMiddlewares() {
			var middlewares = [];
			for (var key in this.route.middlewares) {
				var value = this.route.middlewares[key];
				middlewares.push(_middlewaresSingleton2.default[value]);
			}
			return middlewares;
		}
	}, {
		key: "getController",
		value: function getController() {
			if (this.route.controller) return _controllersSingleton2.default[this.route.controller];

			var expressName = this.name;
			return function (req, res) {

				var reactComponent = req.reactComponent;
				var routes = req.renderProps;
				var rawRoutes = _rawCthulhiConfigSingleton2.default.routes;

				res.render("login/index", {
					reactComponent: reactComponent,
					teste: "quale",
					partialTemplate: "partialteste",
					routes: JSON.stringify(routes),
					rawRoutes: JSON.stringify(rawRoutes)
				});
			};
		}
	}, {
		key: "configRoutes",
		value: function configRoutes(router) {
			this.routes = new _routes2.default(this.route.routes);
			var routesRouter = this.routes.createRoutes(this.getPath(), router);
		}
	}]);

	return Route;
}();

exports.default = Route;