export default {
	name: "helloWorld",
	version: "1.0.0",
	description: "helloWorld",
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "helloWorld")
	}
}