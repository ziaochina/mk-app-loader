'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _parseName = require('./parseName');

var _parseName2 = _interopRequireDefault(_parseName);

var _appFactory = require('./appFactory');

var _appFactory2 = _interopRequireDefault(_appFactory);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appConfig = function appConfig(apps, options) {
	(0, _keys2.default)(options).forEach(function (key) {
		var reg = new RegExp('^' + (key == '*' ? '.*' : key) + '$');
		(0, _keys2.default)(apps).forEach(function (appName) {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key]);
				}
			}
		});
	});
};

exports.default = function (actionInjections, reducerInjections) {
	return function (store) {
		return function (next) {
			return function (action) {
				var getState = store.getState,
				    dispatch = store.dispatch;


				if (typeof action === 'function') {
					var _action = action(),
					    fullName = _action.fullName,
					    name = _action.name,
					    query = _action.query,
					    params = _action.params,
					    actionCreator = _action.actionCreator,
					    args = _action.args,
					    reducer = _action.reducer;

					var reduce = function reduce(type) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}

						dispatch({
							type: '@@reduce',
							payload: {
								fullName: fullName,
								name: name,
								query: query,
								type: type,
								reducer: reducer,
								payload: args,
								reducerInjections: reducerInjections
							}
						});
					};

					var getStateByApp = function getStateByApp() {
						return getState().get(fullName);
					};
					var injections = (0, _extends5.default)({
						currentApp: {
							fullName: fullName,
							name: name,
							query: query,
							params: params
						},
						store: store,
						reduce: reduce,
						getState: getStateByApp
					}, actionInjections);
					var realAction = actionCreator.apply(undefined, (0, _toConsumableArray3.default)(args).concat([injections]));

					if (typeof realAction === 'function') {
						realAction(injections);
					}
				} else if (action.type && action.type == '@@loadApp') {
					try {
						var _fullName = action.payload.fullName,
						    prevFullName = action.payload.prevFullName,
						    parsedName = (0, _parseName2.default)(_fullName);

						var appInfo = _appFactory2.default.getApp(parsedName.name);

						if (appInfo) {
							appInfo.load(function (component, action, reducer) {
								return next({
									type: '@@loadAppReal',
									payload: {
										fullName: _fullName,
										appInfo: appInfo,
										component: component,
										action: action,
										reducer: reducer,
										prevFullName: prevFullName
									}
								});
							});
						} else if (_config2.default.current.requireFn && _config2.default.current.appsMap && _config2.default.current.appsMap[parsedName.name]) {
							var appName = parsedName.name,
							    val = _config2.default.current.appsMap[parsedName.name],
							    url = typeof val == 'string' ? val : val.asset,
							    options = typeof val == 'string' ? {} : val.options,
							    pub = url.indexOf('/') ? url.substr(0, url.lastIndexOf('/') + 1) : '',
							    cssUrl = url.indexOf('.min.js') != -1 ? 'css!' + url.replace(/\.min\.js/, '.min.css') : 'css!' + url.replace(/\.js/, '.css');

							window['__pub_' + appName + '__'] = pub;

							_config2.default.current.requireFn([url, cssUrl], function () {
								if (arguments.length > 0) {
									appInfo = arguments.length <= 0 ? undefined : arguments[0];
									var apps = (0, _extends5.default)({}, _appFactory2.default.getApps(), (0, _defineProperty3.default)({}, appInfo.name, appInfo));
									_appFactory2.default.registerApp(appInfo.name, appInfo);
									appConfig(apps, (0, _defineProperty3.default)({
										"*": { apps: apps }
									}, appName, options));

									appInfo.load(function (component, action, reducer) {
										return next({
											type: '@@loadAppReal',
											payload: {
												fullName: _fullName,
												appInfo: appInfo,
												component: component,
												action: action,
												reducer: reducer,
												prevFullName: prevFullName
											}
										});
									});
								}
							});
						} else if (_config2.default.current.requireFn && _config2.default.current.loadAppInfoFn) {
							_config2.default.current.loadAppInfoFn(parsedName.name).then(function (ret) {
								if (ret) {
									var _appName = parsedName.name,
									    _val = ret,
									    _url = typeof _val == 'string' ? _val : _val.asset,
									    _options = typeof _val == 'string' ? {} : _val.options,
									    _pub = _url.indexOf('/') ? _url.substr(0, _url.lastIndexOf('/') + 1) : '',
									    _cssUrl = _url.indexOf('.min.js') != -1 ? 'css!' + _url.replace(/\.min\.js/, '.min.css') : 'css!' + _url.replace(/\.js/, '.css');

									window['__pub_' + _appName + '__'] = _pub;

									_config2.default.current.requireFn([_url, _cssUrl], function () {
										if (arguments.length > 0) {
											appInfo = arguments.length <= 0 ? undefined : arguments[0];
											var apps = (0, _extends5.default)({}, _appFactory2.default.getApps(), (0, _defineProperty3.default)({}, appInfo.name, appInfo));
											_appFactory2.default.registerApp(appInfo.name, appInfo);
											appConfig(apps, (0, _defineProperty3.default)({
												"*": { apps: apps }
											}, _appName, _options));

											appInfo.load(function (component, action, reducer) {
												return next({
													type: '@@loadAppReal',
													payload: {
														fullName: _fullName,
														appInfo: appInfo,
														component: component,
														action: action,
														reducer: reducer,
														prevFullName: prevFullName
													}
												});
											});
										}
									});
								} else {
									console.error('\u52A0\u8F7D\u5E94\u7528' + parsed.name + '\u5931\u8D25');
								}
							});
						} else {
							console.error('\u52A0\u8F7D\u5E94\u7528' + parsed.name + '\u5931\u8D25');
						}
					} catch (e) {
						console.error(e);
						return next(action);
					}
				} else {
					return next(action);
				}
			};
		};
	};
};

module.exports = exports['default'];