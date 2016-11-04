#!/usr/bin/env node

// Dependencies
const path        = require('path');
const fs          = require('fs');
const program     = require('commander')
const package     = require('./../package.json')
const cli         = require('./components/helpers/cli.js')
const changelog   = require('./components/changelog.js')
const development = require('./components/development.js')
const production  = require('./components/production.js')

// Get parent path
const pathRoot     = path.dirname(module.paths[2], '../')
const pathPackage  = path.join(pathRoot, 'package.json')

// Get parent package
const parent = require(pathPackage)

// CLI interface
program
  .version(package.version)
  .option('-c --changelog', 'Add changelog to the most recent tag')
  .option('-b --build', '')
  .option('-d --development', '')
  .parse(process.argv)

// Actions
if (program.changelog) {
  changelog()
}

if (program.development) {

  // Settings
  const port   = parent.config && parent.config.port || 3333
  const input  = parent.main
  const output = parent.main

  development(port, { input, output }, pathRoot)

}

if (program.build) {

  // Settings
  const input  = parent.main
  const output = './app/assets/' + path.basename(input)

  production({ input, output }, pathRoot)

}
