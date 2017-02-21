// Dependencies
const git = require('./helpers/git.js')

// Module
module.exports = () => {

  // Get list of tags and fetch two newest
  const tag = git.tag()

  const { value: current }  = tag.next()
  const { value: previous } = tag.next()

  // Create change logs between tags
  const changelog = git.changelog(current, previous)

  // Add message to current tag
  git.message(current, changelog)

  // Publish tags
  git.publish()

}
