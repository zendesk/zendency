#!/usr/bin/env node

// Dependencies
const path        = require('path')
const program     = require('commander')
const Asset       = require('./components/helpers/asset')
const changelog   = require('./components/changelog.js')
const development = require('./components/development.js')
const compile     = require('./components/compile.js')
const bundle      = require('./components/bundle.js')

// Get callee assets
const package  = new Asset('package.json')
const manifest = new Asset('manifest.json')

// Relative path of manifest
const paths = {
  manifest: path.join(process.env.PWD, 'manifest.json')
}

// CLI interface
program
  .command('changelog')
  .description('Add changelog to the most recent tag')
  .action((output, options) => {
    changelog(manifest, paths.manifest)
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
  .action((output = './bundle.zip', options) => {
    bundle(package, output)
  });

// Parse node arguments
program.parse(process.argv);
