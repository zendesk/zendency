// Dependencies
const path     = require('path')
const Compiler = require('./helpers/compiler')

// Module definition
module.exports = ({ base, data: { main, files }}, dist) => {

  //
  const format = (file) => ({
    'input':     path.join(base, main, path.relative(main, file)),
    'output':    path.join(base, dist, path.relative(main, file)),
    'extension': path.extname(file).slice(1)
  })

  const fnEntry = (url) => ({
    [url.output]: url.input
  })

  const fnDests = (obj) => ({
    'from': obj.input,
    'to':   obj.output
  })

  //
  const entry = files.map(format).filter(i => i.extension === 'js').map(fnEntry).pop()
  const copy  = files.map(format).filter(i => i.extension !== 'js').map(fnDests)

  // Run compiler
  const compiler = new Compiler({ entry, copy })
  compiler.run(( error, stats ) => {})

}
