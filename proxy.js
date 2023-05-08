const http = require('http');
const https = require('https');
const { URL } = require('url');

let fetch;
(async () => {
    const { default: fetchModule } = await import('node-fetch');
    fetch = fetchModule;
})();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    const url = req.url.slice(1);
    const response = await fetch(url);
    const text = await response.text();

    res.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(text);
});

server.listen(port, hostname, () => {
    console.log(`Proxy server running at http://${hostname}:${port}/`);
});
