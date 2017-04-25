const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const http = require('http');
const chalk = require('chalk');

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

            sleep(delay);

            return action(res);
        }

        res.sendStatus(404);
    });


    app.listen(port, () => {
        console.log('Assets served at ', chalk.cyan(`http://localhost:${port}/asset/<type>/<delayInMS>`));
        console.log('Type can be', chalk.yellow('js'), chalk.magenta('css'), chalk.blue('image'), chalk.red('font'));
    });
}

function sleep(ms) {
    const start = Date.now();

    while (Date.now() < (start + ms));
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