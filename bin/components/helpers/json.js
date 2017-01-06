// Dependencies
const path = require('path')

// Generate paths and file extension from files
exports.format = ({ main, file, dist }) => ({
  to:   path.join(process.env.PWD, dist, path.relative(main, file)),
  from: path.join(process.env.PWD, main, path.relative(main, file)),
  file, dist, main
})

// Convert generated object too object array
exports.toObject = (obj, data) =>
  ( obj[data.to] = data.from ) && obj

// Convert object to array
exports.toArray = (obj, data) =>
  obj.push(data.from) && obj

// Check if file has js extension
exports.hasJS = (data) =>
  path.extname(data.file) === '.js'

// Check if file does not have js extension
exports.notJS = (data) =>
  path.extname(data.file) !== '.js'
