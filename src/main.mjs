const create = require("./create")
const program = require('commander');
const figlet = require('figlet');
const chalk=require("chalk");
const downLoad = require('download-git-repo');

console.log('create a new project using keysight GUI alloy...');
program.command('create [name]')
        .description('create a new project using keysight GUI alloy...')
        .option('-f, --force', 'overwrite target directory if it exist')
        .action((name, options) => {
            create(name, options)    
        })


program.on("--help",()=>{
    console.log('\r\n' + figlet.textSync('KS', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
})

program.version('1.0.0').description('CLI version');

program.parse(process.argv);