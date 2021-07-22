#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const createPassword = require('./utils/create-password');
const savePassword = require('./utils/save-password');
const log = console.log;

program.version('1.0.0').description('Simple password generator');

program
    .option('-l, --length <number>', 'length of password', '8')
    .option('-s, --save', 'Save password to passwords.txt')
    .option('-nn, --no-numbers', 'Remove numbers')
    .option('-ns, --no-symbols', 'Remove symbols')
    .parse();

const {length, save, numbers, symbols} = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save to file
if(save){
    savePassword(generatedPassword);
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

// Output generated password
log(chalk.blue('Generated password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));