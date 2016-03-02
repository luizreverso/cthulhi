"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (rawRoutes) {
	var routes = rawRoutes;
	_expressAppSingleton2.default.use(function (req, res, next) {
		if (req.url.indexOf("\.") < 0 && req.url.indexOf("api") < 0) {
			var location = (0, _createLocation2.default)(req.url);
			var alternativeroutes = routes;

			(0, _reactRouter.match)({ routes: routes, location: location }, function (error, redirectLocation, renderProps) {
				if (redirectLocation) {
					res.redirect(301, redirectLocation.pathname + redirectLocation.search);
				} else if (error) {
					res.send(500, error.message);
				} else if (renderProps == null) {
					res.send(404, 'Not found');
					next();
				} else {
					req.renderProps = renderProps;
					req.reactComponent = _server2.default.renderToString(_react2.default.createElement(_reactRouter.RouterContext, renderProps));
					next();
				}
			});
		} else {
			next();
		}
	});
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _createMemoryHistory = require("history/lib/createMemoryHistory");

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createLocation = require("history/lib/createLocation");

var _createLocation2 = _interopRequireDefault(_createLocation);

var _expressAppSingleton = require("../utils/expressAppSingleton");

var _expressAppSingleton2 = _interopRequireDefault(_expressAppSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }