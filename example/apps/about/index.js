export default {
	name: "about",
	version: "1.0.0",
	description: "about",
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "about")
	}
}