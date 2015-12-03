var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var contextPath = path.resolve(__dirname, '..');
var mainPath = path.resolve(__dirname, '../src', 'app', 'main.js');
var nodeModulesPath = path.resolve(__dirname, '../node_modules');
var buildPath = path.resolve(__dirname, '../target', 'build');

var config = {
	context: contextPath,
	entry: [mainPath],
	debug: false,
	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath]},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')}
		]
	},
	plugins: [
		new ExtractTextPlugin('component-styles.css', {allChunks: true}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {warnings: false}
		})
	],
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		jquery: 'jQuery'
	},
	resolve: {
		modulesDirectories: ['node_modules']
	}
};

module.exports = config;
