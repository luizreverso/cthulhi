'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoController = function () {
	function MongoController() {
		_classCallCheck(this, MongoController);
	}

	_createClass(MongoController, [{
		key: 'contructor',
		value: function contructor() {}
	}, {
		key: 'connectMongo',
		value: function connectMongo(config) {
			var _this = this;

			_mongoose2.default.connect(config.connection);
			var db = _mongoose2.default.connection;
			db.on('error', console.error.bind(console, 'connection error...'));
			db.once('open', function () {
				console.log('db up and ready to roll');
				_this.createSchemas(config.models);
			});
		}
	}, {
		key: 'createSchemas',
		value: function createSchemas(models) {
			for (var name in models) {
				this.createSchema(name, models[name]);
			}
		}
	}, {
		key: 'createSchema',
		value: function createSchema(name, model) {
			_mongoose2.default.model(name, new _mongoose.Schema(model));
		}
	}]);

	return MongoController;
}();

exports.default = MongoController;