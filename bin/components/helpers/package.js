// Dependencies
const path = require('path')
const fs   = require('./fs')

// Module definition
class Package {

  constructor(filename) {

    // Get parent path
    const dir = path.dirname(module.paths[3], '../')
    const pkg = fs.absolute(dir, filename)

    try {

      return {
        path: dir,
        data: require(pkg)
      }

    } catch(e) {
      return 'could not find module'
    }

  }

}

// Export module
module.exports = Package;
