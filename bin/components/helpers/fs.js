// Dependencies
const path = require('path')

// Split path into filepath and filename
const split = (url) => {

  // Parse directory
  const filepath  = path.dirname(url)
  const filename  = path.basename(url)
  const extension = path.extname(url)

  // Return folder and filename
  return extension
    ? { filepath, filename }
    : { filepath: filename }

}

// Filter out directories
const onlyFiles = (input) =>
  input.filter(file => !!path.extname(file))

// Give input absolute path
const absolute = (base, input) =>
  input instanceof Array
    ? input.map(file => path.join(base, file))
    : path.join(base, input)

// Give input relative path
const relative = (base, input) =>
  input instanceof Array
    ? input.map(file => path.relative(base, file))
    : path.relative(base, input)

// Manipulate input
const map = (input, fn) =>
  [].concat(input).map(item => fn.call(this, item))

// Export
module.exports = { split, onlyFiles, absolute, relative, map }
