// Dependencies
const fs   = require('fs')
const path = require('path')

// Module
module.exports = (manifest, package, output) => {

  // Sync manifest version with package.json
  manifest.version = package.version

  // Get relative path
  const file = path.join(process.env.PWD, output)

  // Overwrite manifest
  fs.writeFile(file, JSON.stringify(manifest, null, 2), error => {
    if (error) throw err
  })

}
