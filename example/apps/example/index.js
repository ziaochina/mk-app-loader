export default {
	name: "example",
	version: "1.0.0",
	description: "example",
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "example")
	}
}