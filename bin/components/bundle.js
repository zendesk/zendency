// Dependencies
const Compiler = require('./helpers/compiler')
const Compress = require('./helpers/compress')
const paths    = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, directories }, dist, temp = './.temp/') => {

  // Create file paths
  const entry = paths.entry(input, { paths: [temp, '/assets/'] })
  const copy  = paths.files(files, { paths: [temp, '/assets/'] })

  // Copy manifest and translations to bundle
  copy.push({
    from: paths.absolute('manifest.json'),
    to:   paths.absolute(temp, 'manifest.json')
  }, {
    from: paths.absolute(directories.translations),
    to:   paths.absolute(temp, paths.basename(directories.translations))
  })

  // Initiate plugins
  const plugins = [
    new Compiler.CopyPlugin(copy)
  ]

  // Create and run compiler
  const compiler = new Compiler({ entry, plugins })
  compiler.compile(error => {
    (!error) && Compress.zip(temp, dist)
  })

}
