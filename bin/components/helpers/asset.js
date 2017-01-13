// Dependencies
const path = require('path')

// Module definition
const Package = function(filename) {

  // Get parent path
  const file = path.join(process.env.PWD, filename)

  // Try to require file
  try {
    return require(file)
  } catch(e) {
    return 'could not find module'
  }

}

// Export module
module.exports = Package;
