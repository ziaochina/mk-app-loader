import { config, start } from 'mk-app-loader'
import about from './apps/about'
import helloWorld from './apps/helloWorld'
import example from './apps/example'

const apps = {
	[about.name]: about,
	[helloWorld.name]: helloWorld,
	[example.name]: example
}

config({
	apps,
	middlewares: [], //redux中间件
	actionInjections: {},//action注入
	reducerInjections: {},//reducer注入
	targetDomId: 'app',
	startAppName: 'example'
})

start()