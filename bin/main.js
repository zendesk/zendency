#!/usr/bin/env node

// Dependencies
const program     = require('commander')
const changelog   = require('./components/changelog.js')
const compile     = require('./components/compile.js')
const Package     = require('./components/helpers/package')

// Get callee packages
const package = new Package('package.json')

// CLI interface
program
  .option('-c --changelog',   'Add changelog to the most recent tag')
  .option('-d --development', 'Run project in development environment')
  .option('-c --compile',     'Compile project for release')
  .option('-b --bundle',      'Bundle project for app framework')
  .parse(process.argv)

// Actions
if (program.changelog)
  changelog(package)

if (program.compile)
  compile(package, './app/')
