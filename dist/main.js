"use strict";

var create = require("./create");
var program = require('commander');
var figlet = require('figlet');
var chalk = require("chalk");
var downLoad = require('download-git-repo');
console.log('create a new project using keysight GUI alloy...');
program.command('create [name]').description('create a new project using keysight GUI alloy...').option('-f, --force', 'overwrite target directory if it exist').action(function (name, options) {
  create(name, options);
});
program.on("--help", function () {
  console.log('\r\n' + figlet.textSync('KS', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));
});
program.version('1.0.0').description('CLI version');
program.parse(process.argv);