#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const server = require('./server');

program
    .version(pkg.version)
    .option('-p, --port <n>', 'Port number to launch server in', parseInt)
    .option('-t, --tunnel', 'Tunnel to localhost')
    .parse(process.argv);

server(program);