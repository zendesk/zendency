// Dependencies
const fs  = require('fs')
const git = require('./helpers/git.js')

// Module
module.exports = (manifest, output) => {

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

  // Check if manifest exists
  if (manifest) {

    // Update manifest version
    manifest.version = current.slice(1)

    // Overwrite manifest
    fs.writeFile(output, JSON.stringify(manifest, null, 2), error => {
      if (error) throw err
    });

  }

}
