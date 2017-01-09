// Dependencies
const path = require('path')

// Get absolute path
exports.absolute = (file) =>
  path.join(process.env.PWD, file)

// Get relative path
exports.relative = (main, file) =>
  path.relative(main, file)

// Create paths
exports.paths = ({main, file}, dist = '') => ({
  from: path.join(process.env.PWD, main, path.relative(main, file)),
  to:   Boolean(dist)
          ? path.join(process.env.PWD, dist, path.relative(main, file))
          : path.relative(main, file)
})

// Convert generated object to compiler object
exports.compiler = (obj, data) =>
  ( obj[data.to] = data.from ) && obj

// Convert generated object to server object
exports.server = (obj, data) =>
  ( obj[data.to] = [data.from, 'webpack/hot/only-dev-server'] ) && obj

// Check if file has js extension
exports.hasJS = (data) =>
  path.extname(data.from) === '.js'

// Check if file does not have js extension
exports.notJS = (data) =>
  path.extname(data.from) !== '.js'
