#! /usr/bin/env node

/*
 # -----------------------------------------------------------------------------
 # ~/bin/j1.js
 # JS command wrapper for J1 Template
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
*/
'use strict';

// ---------------------------------------------------------------------------
// modules|libraries
// ---------------------------------------------------------------------------
var shell = require('shelljs');
var yargs = require('yargs');
var getos = require('getos')

// ---------------------------------------------------------------------------
// globals
// ---------------------------------------------------------------------------
var os = '';

os = getos(function(e,os) {
  var os_info = JSON.stringify(os);
  if(e) return e;
  return os['os'];
});

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
var argv = yargs.usage("$0 command")
  .command('gh', 'list repo commit history', function (yargs) {
    if (os === 'win32') {
      shell.exec('git log --pretty=format:"%Cred%h%Creset -%C(yellow)%ad%Creset - %Cgreen(%cr)%Creset | %C(bold blue)%s%d [%an]%Creset" --graph --date=short');
    } else {
      shell.exec("git log --pretty=format:'%Cred%h%Creset -%C(yellow)%ad%Creset - %Cgreen(%cr)%Creset | %C(bold blue)%s%d [%an]%Creset' --graph --date=short");
    }
  })
  .command('gs', 'list current status of the repo', function (yargs) {
    shell.exec('git status');
  })
  .command('rackup', 'run rackup', function (yargs) {
    if (os === 'win32') {
      shell.exec('bundle exec rackup -s %WEBSERVER% -o %INTERFACE% -p %PORT% %CD%/config.ru');
    } else {
      shell.exec('export RACKUP_CFG_PATH=`pwd` && bundle exec rackup -s $WEBSERVER -o $INTERFACE -p $PORT $RACKUP_CFG_PATH/config.ru');
    }
  })
  .command('getos', 'print the name of the operating system', function (yargs) {
    console.log(os);
  })
  .command('pwd', 'print current working directory', function (yargs) {
    if (os === 'win32') {
      shell.exec('echo %CD%');
    } else {
      shell.exec(pwd);
    }
  })
  .demand(1, 'must provide a valid command')
  .help('h')
  .alias('h', 'help')
  .argv;
