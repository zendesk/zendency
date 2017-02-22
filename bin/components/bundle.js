// Dependencies
const Compiler = require('./helpers/compiler')
const Compress = require('./helpers/compress')
const paths    = require('./helpers/paths')

// Module definition
module.exports = ({ compiler: input, files, directories }, dist) => {

  // Check if filetype is zip
  const compressed = paths.filetype(dist) === 'zip'

  // Create build directory
  const build = compressed ? './.temp/' : dist

  // Create file paths
  const entry = paths.entry(input, { paths: [build, '/assets/'] })
  const copy  = paths.files(files, { paths: [build, '/assets/'] })

  // Copy manifest and translations to bundle
  copy.push({
    from: paths.absolute('manifest.json'),
    to:   paths.absolute(build, 'manifest.json')
  }, {
    from: paths.absolute(directories.translations),
    to:   paths.absolute(build, paths.basename(directories.translations))
  })

  // Initiate plugins
  const plugins = [
    new Compiler.CopyPlugin(copy)
  ]

  // Create and run compiler
  const compiler = new Compiler({ entry, plugins })
  compiler.compile(error => {
    (!error) && (compressed) && Compress.zip(build, dist)
  })

}
