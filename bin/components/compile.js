// Dependencies
const Compiler = require('./helpers/compiler')
const json     = require('./helpers/json')

// Module definition
module.exports = ({ main, files }, dist) => {

  // Format data
  const format = (file) =>
    json.format({ main, file, dist })

  // Create file paths
  const entry = files.map(format).filter(json.hasJS).reduce(json.toObject, {})
  const copy  = files.map(format).filter(json.notJS)

  // Initiate plugins
  const plugins = [
    new Compiler.CopyPlugin(copy)
  ]

  // Create and run compiler
  const compiler = new Compiler({ entry, plugins })
  compiler.run(( error, stats ) => {})

}
