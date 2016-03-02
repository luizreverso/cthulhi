"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = require("./route");

var _route2 = _interopRequireDefault(_route);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _reactRouterController = require("../react/reactRouterController");

var _reactRouterController2 = _interopRequireDefault(_reactRouterController);

var _reactRouterMiddleware = require("../react/reactRouterMiddleware");

var _reactRouterMiddleware2 = _interopRequireDefault(_reactRouterMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var expressApp = undefined;

var Routes = function () {
	function Routes(rawRoutes, expressParam) {
		_classCallCheck(this, Routes);

		this.unparsedRoutes = rawRoutes;
		if (!expressApp) expressApp = expressParam;
	}

	_createClass(Routes, [{
		key: "createRootRoutes",
		value: function createRootRoutes() {
			var router = undefined;
			for (var key in this.unparsedRoutes) {
				var raw = this.unparsedRoutes[key];
				var path = raw.path;
				raw.path = "/";
				router = this.createRoute(key, raw);

				if (key == "public" && raw.reactHandler) {
					var reactRouter = new _reactRouterController2.default();
					var reactRoutes = reactRouter.getReactRoutes(key, raw);
					(0, _reactRouterMiddleware2.default)(reactRoutes);
				}

				expressApp.setRoutes(path, router);
			}
			return router;
		}
	}, {
		key: "createRoute",
		value: function createRoute(key, raw) {
			var router = _express2.default.Router();

			var route = new _route2.default(key, raw);
			route.configExpressRoute(router);
			return router;
		}
	}, {
		key: "createRoutes",
		value: function createRoutes(parentPath, parentRouter) {
			var router = undefined;
			for (var key in this.unparsedRoutes) {
				var raw = this.unparsedRoutes[key];
				router = this.createRoute(key, raw);
				parentRouter.use(parentPath, router);

				// this.parentRouter.use()
				// expressApp.setRoutes(raw.path, router);
				// expressApp.setRoutes("", router);
			}
			return router;
		}

		// createRoutes() {
		// 	let router;
		// 	for (let key in this.unparsedRoutes) {
		// 		router = express.Router();
		// 		let rawRoute = this.unparsedRoutes[key];

		// 		console.log(key);
		// 		let route = new Route(key, rawRoute, router);
		// 		router = route.configExpressRoute();
		// 		expressApp.setRoutes("", router);
		// 	}
		// 	return router;
		// }

	}, {
		key: "setParentRouter",
		value: function setParentRouter(router) {
			this.parentRouter = router;
		}
	}]);

	return Routes;
}();

exports.default = Routes;