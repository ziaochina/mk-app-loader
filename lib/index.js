'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadApp = exports.getApps = exports.getApp = exports.registerApps = exports.registerApp = exports.start = exports.init = exports.config = exports.reducer = exports.appMiddleware = exports.AppLoader = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _appLoader = require('./appLoader');

var _appLoader2 = _interopRequireDefault(_appLoader);

var _appMiddleware = require('./appMiddleware');

var _appMiddleware2 = _interopRequireDefault(_appMiddleware);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _appFactory = require('./appFactory');

var _appFactory2 = _interopRequireDefault(_appFactory);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerApp = _appFactory2.default.registerApp,
    registerApps = _appFactory2.default.registerApps,
    getApp = _appFactory2.default.getApp,
    getApps = _appFactory2.default.getApps;


var loadApp = function loadApp(name, props) {
	return _react2.default.createElement(_appLoader2.default, (0, _extends3.default)({}, props, { name: name }));
};

exports.AppLoader = _appLoader2.default;
exports.appMiddleware = _appMiddleware2.default;
exports.reducer = _reducer2.default;
exports.config = _config2.default;
exports.init = _init2.default;
exports.start = _start2.default;
exports.registerApp = registerApp;
exports.registerApps = registerApps;
exports.getApp = getApp;
exports.getApps = getApps;
exports.loadApp = loadApp;