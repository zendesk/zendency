// Dependencies
const Compiler  = require('./helpers/compiler')
const paths     = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, main, config }, manifest) => {

  // Create file paths
  const entry = paths.server(input, { port: config.port })
  const base  = paths.absolute(main)

  // Initiate plugins
  const plugins = [
    new Compiler.HotModulePlugin(),
    new Compiler.NoErrorsPlugin()
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
