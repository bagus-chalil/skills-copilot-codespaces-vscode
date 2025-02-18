//Create web Server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data);
                response.end();
            }
        });
    } else if (pathname == '/addComment') {
        var str = '';
        request.on('data', function(chunk) {
            str += chunk;
        });
        request.on('end', function() {
            var obj = qs.parse(str);
            comments.push(obj);
            response.end(JSON.stringify(comments));
        });
    } else if (pathname == '/getComments') {
        response.end(JSON.stringify(comments));
    } else {
        var file = path.normalize('.' + pathname);
        fs.exists(file, function(exist) {
            if (exist) {
                fs.readFile(file, function(err, data) {
                    if (err) {
                        response.writeHead(404);
                        response.end('Internal Server Error');
                    } else {
                        response.end(data);
                    }
                });
            } else {
                response.writeHead(404);
                response.end('File Not Found');
            }
        });
    }
});
server.listen(3000, function() {
    console.log('Server is running at http://localhost:3000');
});