const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http');
const chalk = require('chalk');
const localtunnel = require('localtunnel');

const typeToActionMap = {
    js: serveJS,
    css: serveCSS,
    font: serveFont,
    image: serveImage
};

function initServer(program) {
    const app = express();
    const port = program.port || 3000;

    app.use(cors());

    app.get('/asset/:type/:delay', (req, res) => {
        const delay = Number(req.params.delay) || 0;

        const action = typeToActionMap[req.params.type.toLowerCase()];

        if (action) {
            console.log(`Serving ${req.params.type} with ${delay}ms delay`);

            setTimeout(() => {
                action(res);
            }, delay);

        } else {
            res.sendStatus(404);
        }

    });


    app.listen(port, () => {
        if (program.tunnel) {
            localtunnel(port, (err, tunnel) => {
                serverMessage(tunnel.url);
            });

        } else {
            serverMessage(`http://localhost:${port}`);
        }
    });
}

function serverMessage(url) {
    console.log('Assets served at ', chalk.cyan(`${url}/asset/<type>/<delayInMS>`));
    console.log('Type can be', chalk.yellow('js'), chalk.magenta('css'), chalk.blue('image'), chalk.red('font'));
}


function serveJS(response) {
    response.set('Content-Type', 'application/javascript');

    response.send('');
}

function serveCSS(response) {
    response.set('Content-Type', 'text/css');

    response.send('');
}

function serveFont(response) {
    response.set('Content-Type', 'font/woff2');

    fs.createReadStream(path.join(__dirname, 'font.woff2')).pipe(response);
}

function serveImage(response) {
    response.set('Content-Type', 'image/jpeg');

    http.get('http://lorempixel.com/100/100/', (image) => {
        image.pipe(response);
    });
}

module.exports = initServer;