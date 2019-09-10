#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");

var argv = yargs.usage("$0 command")
  .command("gh", "list repo commit histiory", function (yargs) {
    shell.exec("git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short");
  })
  .command("gs", "list current status of the repo", function (yargs) {
    shell.exec("git status");
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv