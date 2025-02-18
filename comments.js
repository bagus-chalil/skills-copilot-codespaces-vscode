//Create web Server
const http = require('http');
//Create web Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Comments</h1>');
    res.end();
});
server.listen(3000, 'localhost', () => {
    console.log('Server is running');
});