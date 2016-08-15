#!/usr/bin/env node

// Dependencies
const program   = require('commander')
const changelog = require('./components/changelog.js')

// CLI interface
program
  .version('1.0.0')
  .option('-c --changelog', 'Add changelog to the most recent tag')
  .parse(process.argv)

// Actions
if (program.changelog) changelog()
