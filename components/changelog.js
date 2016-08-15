// Dependencies
const cli = require('./helpers/cli.js')
const git = require('./helpers/git.js')

// Terminal
const terminal = {

  0: () => {
    cli.line()
    cli.list('Find tags', true)
    cli.list('Generate changelog', false)
    cli.list('Add message', false)
    cli.list('Push message', false)
  },

  1: () => {
    cli.move(-4)
    cli.list('Find tags', false)
    cli.list('Generate changelog', true)
    cli.list('Add message', false)
    cli.list('Push message', false)
  },

  2: () => {
    cli.move(-4)
    cli.list('Find tags', false)
    cli.list('Generate changelog', false)
    cli.list('Add message', true)
    cli.list('Push message', false)
  },

  3: () => {
    cli.move(-4)
    cli.list('Find tags', false)
    cli.list('Generate changelog', false)
    cli.list('Add message', false)
    cli.list('Push message', true)
  },

  4: () => {
    cli.move(-4)
    cli.list('Find tags', false)
    cli.list('Generate changelog', false)
    cli.list('Add message', false)
    cli.list('Push message', false)
    cli.line()
    cli.log('Completed')
    cli.line()
  },

  log: (n) => terminal[n].call()

}

// Module
module.exports = () => {

  // Add to terminal
  terminal.log(0)

  // Get list of tags and fetch two newest
  const tag = git.tag()

  const { value: current }  = tag.next()
  const { value: previous } = tag.next()

  terminal.log(1)

  // Create change logs between tags
  const changelog = git.changelog(current, previous)
  terminal.log(2)

  // Add message to current tag
  git.message(current, changelog)
  terminal.log(3)

  // Publish tags
  git.publish()
  terminal.log(4)

}
