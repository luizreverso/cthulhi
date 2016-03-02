"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controllersSingleton = require("../utils/controllersSingleton");

var _controllersSingleton2 = _interopRequireDefault(_controllersSingleton);

var _pathsSingleton = require("../utils/pathsSingleton");

var _pathsSingleton2 = _interopRequireDefault(_pathsSingleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller(rawControllers) {
		_classCallCheck(this, Controller);

		this.rawControllers = rawControllers;
	}

	_createClass(Controller, [{
		key: "configControllers",
		value: function configControllers() {
			for (var key in this.rawControllers) {
				var raw = this.rawControllers[key];
				var controller = this.setupController(raw);
				_controllersSingleton2.default[key] = controller;
			}
		}
	}, {
		key: "setupController",
		value: function setupController(raw) {
			var path = _pathsSingleton2.default.root + raw.path + raw.controller;
			var controller = require(path);
			if (raw.type == "class") {
				controller = new controller.default();
			}
			return controller[raw.action];
		}
	}]);

	return Controller;
}();

exports.default = Controller;