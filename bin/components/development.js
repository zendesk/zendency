// Dependencies
const Compiler  = require('./helpers/compiler')
const paths     = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, main, config }, manifest) => {

  // Create file paths
  const entry = paths.server(input, { port: config.port })
  const copy  = paths.files(files, { flat: true })
  const base  = paths.absolute(main)

  // Add files to entry
  entry.files = copy

  // Initiate plugins
  const plugins = [
    new Compiler.HotModulePlugin()
  ]

  // Server options
  const options = {
    port: config.port,
    base, manifest
  }

  // Create development server
  const compiler = new Compiler({ entry, plugins, path: '/' })
  compiler.listen(options, error => {
    console.log('localhost:' + config.port)
  })

}
