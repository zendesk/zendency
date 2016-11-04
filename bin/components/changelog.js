// Dependencies
const cli = require('./helpers/cli.js')
const git = require('./helpers/git.js')

// Terminal
const terminal = {

  0: () => {
    cli.clear();
    cli.line()
    cli.list('Find tags',          { type:'on' })
    cli.list('Generate changelog', { type:'off' })
    cli.list('Add message',        { type:'off' })
    cli.list('Push message',       { type:'off' })
  },

  1: () => {
    cli.move(-4)
    cli.list('Find tags',          { type:'done' })
    cli.list('Generate changelog', { type:'on' })
    cli.list('Add message',        { type:'off' })
    cli.list('Push message',       { type:'off' })
  },

  2: () => {
    cli.move(-4)
    cli.list('Find tags',          { type:'done' })
    cli.list('Generate changelog', { type:'done' })
    cli.list('Add message',        { type:'on' })
    cli.list('Push message',       { type:'off' })
  },

  3: () => {
    cli.move(-4)
    cli.list('Find tags',          { type:'done' })
    cli.list('Generate changelog', { type:'done' })
    cli.list('Add message',        { type:'done' })
    cli.list('Push message',       { type:'on' })
  },

  4: () => {
    cli.move(-4)
    cli.list('Find tags',          { type:'done' })
    cli.list('Generate changelog', { type:'done' })
    cli.list('Add message',        { type:'done' })
    cli.list('Push message',       { type:'done' })
    cli.line()
    cli.success('Completed')
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
