'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appFactory = function appFactory() {
    var _this = this;

    (0, _classCallCheck3.default)(this, appFactory);

    this.registerApp = function (name, app) {
        if (_this.apps[name]) return;
        //throw `已经注册过这个app，不能重复注册. name: ${name}`

        _this.apps[name] = app;
    };

    this.registerApps = function (apps) {
        _this.apps = (0, _extends3.default)({}, _this.apps, apps);

        window.__mk_apps__ = _this.apps;
    };

    this.getApp = function (name) {
        var app = _this.apps[name];

        if (app) return app;

        if (_config2.default.current.requireFn && _config2.default.current.appsMap && _config2.default.current.appsMap[name]) return;

        if (_config2.default.current.requireFn && _config2.default.current.loadAppInfoFn) return;

        if (!app) {
            throw '\u6CA1\u6709\u6CE8\u518C\u8FD9\u4E2Aapp. name: ' + name;
        }
        return app;
    };

    this.getApps = function () {
        return _this.apps;
    };

    this.apps = {};
};

var appFactoryInstance = new appFactory();

exports.default = appFactoryInstance;
module.exports = exports['default'];