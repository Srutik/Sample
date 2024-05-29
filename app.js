const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js App</title>
            </head>
            <body>
                <h1>Hello, World!</h1>
                <img src="/image" alt="Sample Image">
            </body>
            </html>
        `);
    } else if (req.url === '/image') {
        const imagePath = path.join(__dirname, 'image.jpg'); // Ensure you have an image named 'image.jpg' in the same directory

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error loading image');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
