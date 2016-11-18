#!/usr/bin/env node

// Dependencies
const program     = require('commander')
const package     = require('./../package.json')
const changelog   = require('./components/changelog.js')
const development = require('./components/development.js')
const compile     = require('./components/compile.js')

// CLI interface
program
  .version(package.version)
  .option('-c --changelog',   'Add changelog to the most recent tag')
  .option('-d --development', 'Run project in development environment')
  .option('-p --compile',     'Compile project for release')
  .parse(process.argv)

// Actions
if (program.changelog)
  changelog()

if (program.development)
  development()

if (program.compile)
  compile()
