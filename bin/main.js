#!/usr/bin/env node

// Dependencies
const program     = require('commander')
const Asset       = require('./components/helpers/asset')
const changelog   = require('./components/changelog.js')
const development = require('./components/development.js')
const compile     = require('./components/compile.js')
const bundle      = require('./components/bundle.js')

// Get callee assets
const package  = new Asset('package.json')
const manifest = new Asset('manifest.json')

// CLI interface
program
  .command('changelog')
  .description('Add changelog to the most recent tag')
  .action((output, options) => {
    changelog(package)
  });

program
  .command('development')
  .description('Run project in development environment')
  .action((output, options) => {
    development(package, manifest)
  });

program
  .command('compile [output]')
  .description('Compile project for release')
  .action((output = './build/', options) => {
    compile(package, output)
  });

program
  .command('bundle [output]')
  .description('Bundle project for app framework')
  .action((output = './bundle/', options) => {
    bundle(package, output)
  });

program.parse(process.argv);
