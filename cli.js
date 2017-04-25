const program = require('commander');
const pkg = require('./package.json');
const server = require('./server');

program
    .version(pkg.version)
    .option('-p, --port <n>', 'Port number to launch server in', parseInt)
    .parse(process.argv);

server(program);