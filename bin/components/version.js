// Dependencies
const fs  = require('fs')

// Module
module.exports = (manifest, output) => {

    // Get relative path
    const file = path.join(process.env.PWD, output)

    // Update manifest version
    manifest.version = current.slice(1)

    // Overwrite manifest
    fs.writeFile(file, JSON.stringify(manifest, null, 2), error => {
      if (error) throw err
    });

  }

}
