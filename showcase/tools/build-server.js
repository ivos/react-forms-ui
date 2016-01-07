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
var publicPath = path.resolve(__dirname, '../target', 'build');

app.use('/app', express.static(publicPath));

app.all('/backend/*', function (req, res) {
	// remove /backend from the start of the URL
	req.url = req.url.substring(8);
	proxy.web(req, res, {
		target: 'http://localhost:8080/my-app-backend/'
	});
});

proxy.on('error', function (e) {
// Just catch it
});

var server = http.createServer(app);

server.listen(port, function () {
	console.log('Server running on port ' + port);
});
