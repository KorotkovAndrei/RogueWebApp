const http = require('http');
const fs = require('fs');
const path = require('path');

const STATIC_PATH = path.join(process.cwd(), './src/main/resources/static');

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};

const serveFile = name => {
    const filePath = path.join(STATIC_PATH, name);
    if (!filePath.startsWith(STATIC_PATH)) {
        console.log(`Can't be served: ${name}`);
        return null;
    }
    const stream = fs.createReadStream(filePath);
    console.log(`Served: ${name}`);
    return stream;
};

http.createServer((req, res) => {
    console.log('WORKS!')
    const { url } = req;
    const name = url === '/' ? '/index.html' : url;
    const fileExt = path.extname(name).substring(1);
    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;

    res.writeHead(200, { 'Content-Type': mimeType });
    const stream = serveFile(name);
    stream.on('error', e => console.error(e));
    if (stream) stream.pipe(res);
}).listen(process.env.PORT || 4000);
