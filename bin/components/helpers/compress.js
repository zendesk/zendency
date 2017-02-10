// Dependencies
const fs       = require('fs')
const del      = require('del')
const Archiver = require('archiver')

// Module definition
const zip = (cwd, dist) => {

  // Create
  const output  = fs.createWriteStream(dist)
  const archiver = Archiver('zip')

  // Events
  output.on('close', () => {
    del(cwd)
  })
  archiver.on('error', err => { throw err })

  // Pipe output
  archiver.pipe(output)
  archiver.glob('**/*', { cwd })

  // Finalize
  archiver.finalize()

}


// Export module
module.exports = { zip }
