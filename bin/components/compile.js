// Dependencies
const Compiler = require('./helpers/compiler')
const paths    = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files }, dist) => {

  // Create file paths
  const entry = paths.entry(input, { paths: [dist] })
  const copy  = paths.files(files, { paths: [dist] })

  // Initiate plugins
  const plugins = [
    new Compiler.CopyPlugin(copy)
  ]

  // Create and run compiler
  const compiler = new Compiler({ entry, plugins })
  compiler.compile(error => {})

}
