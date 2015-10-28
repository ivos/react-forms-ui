var webpack = require('webpack');
var config = require('./build-config');

var bundleStart = null;
var compiler = webpack(config);
compiler.plugin('compile', function () {
	console.log('Bundling...');
	bundleStart = Date.now();
});
compiler.plugin('done', function () {
	console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

compiler.run(function (err, stats) {
	if (err) {
		console.error('ERROR: ' + err);
	} else {
		console.log('Done. ' + stats.toString());
	}
});
