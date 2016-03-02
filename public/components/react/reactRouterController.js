"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _pathsSingleton = require("../utils/pathsSingleton");

var _pathsSingleton2 = _interopRequireDefault(_pathsSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reactRouterController = function () {
	function reactRouterController() {
		_classCallCheck(this, reactRouterController);
	}

	_createClass(reactRouterController, [{
		key: "getReactRoutes",
		value: function getReactRoutes(name, raw) {

			var route = _react2.default.createElement(_reactRouter.Route, this.getReactRouteParams(name, raw), this.getChildrenReactRoutes(raw));
			return route;
		}
	}, {
		key: "getReactRouteParams",
		value: function getReactRouteParams(name, raw) {
			var reactComponent = require(_pathsSingleton2.default.root + _pathsSingleton2.default.reactComponents + raw.reactHandler);
			var routeParams = {
				name: name,
				path: raw.path,
				handler: reactComponent.default,
				component: reactComponent.default
			};
			return routeParams;
		}
	}, {
		key: "getChildrenReactRoutes",
		value: function getChildrenReactRoutes(route) {
			var childRoutes = [];

			for (var key in route.routes) {
				var raw = route.routes[key];

				if (!raw.reactHandler) continue;

				var child = this.getReactRoutes(key, raw);
				childRoutes.push(child);
			}

			return childRoutes;
		}
	}]);

	return reactRouterController;
}();

exports.default = reactRouterController;