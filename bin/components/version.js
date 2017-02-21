// Dependencies
const fs  = require('fs')
const git = require('./helpers/git.js')

// Module
module.exports = (manifest, output) => {

  // Get list of tags and fetch two newest
  const tag = git.tag()

  // Update manifest version
  manifest.version = tag.slice(1)

  // Get relative path
  const file = path.join(process.env.PWD, output)

  // Overwrite manifest
  fs.writeFile(file, JSON.stringify(manifest, null, 2), error => {
    if (error) throw err
  })

}
