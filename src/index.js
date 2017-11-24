import AppLoader from './appLoader'
import appMiddleware from './appMiddleware'
import reducer from './reducer'
import config from './config'
import start from './start'
import appFactory from './appFactory'
import init from './init'

const {registerApp, registerApps} = appFactory
export {
	AppLoader,
	appMiddleware,
	reducer,
	config,
	init,
	start,
	registerApp,
	registerApps
}