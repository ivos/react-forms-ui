var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
	changeOrigin: true,
	ws: true
});
var app = express();
var port = 3000;
var publicPath = path.resolve(__dirname, '../src', 'public');
var cssPath = path.resolve(__dirname, '../src', 'css');
var overridePath = path.resolve(__dirname, 'override');

app.use('/app', express.static(overridePath));
app.use('/app', express.static(cssPath));
app.use('/app', express.static(publicPath));

app.all('/backend/*', function (req, res) {
	// remove /backend from the start of the URL
	req.url = req.url.substring(8);
	proxy.web(req, res, {
		target: 'http://localhost:8080/my-app-backend/'
	});
});

var bundle = require('./dev-bundle.js');
bundle();
app.all('/app/*', function (req, res) {
	proxy.web(req, res, {
		target: 'http://127.0.0.1:3001'
	});
});
app.all('/socket.io*', function (req, res) {
	proxy.web(req, res, {
		target: 'http://127.0.0.1:3001'
	});
});

proxy.on('error', function (e) {
// Just catch it
});

// We need to use basic HTTP service to proxy
// websocket requests from webpack
var server = http.createServer(app);

server.on('upgrade', function (req, socket, head) {
	proxy.ws(req, socket, head);
});

server.listen(port, function () {
	console.log('Server running on port ' + port);
});
