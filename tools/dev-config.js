var webpack = require('webpack');
var path = require('path');
var contextPath = path.resolve(__dirname, '..');
var mainPath = path.resolve(__dirname, '../src', 'app', 'main.js');
var nodeModulesPath = path.resolve(__dirname, '../node_modules');
var buildPath = path.resolve(__dirname, '../target', 'build');

var config = {
	context: contextPath,
	devtool: 'eval-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/dev-server',
		mainPath],
	debug: true,
	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: [nodeModulesPath]
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	resolve: {
		modulesDirectories: ['node_modules']
	}
};

module.exports = config;
