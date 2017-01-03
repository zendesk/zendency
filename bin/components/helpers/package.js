// Dependencies
const path = require('path')

// Module definition
class Package {

  constructor(filename) {

    // Give input absolute path
    const absolute = (base, input) =>
      input instanceof Array
        ? input.map(file => path.join(base, file))
        : path.join(base, input)

    // Get parent path
    const dir = process.env.PWD
    const pkg = absolute(dir, filename)

    try {

      return {
        base: dir,
        data: require(pkg)
      }

    } catch(e) {
      return 'could not find module'
    }

  }

}

// Export module
module.exports = Package;
