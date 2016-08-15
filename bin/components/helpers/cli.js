// Dependencies
const clc = require('cli-color')

// Settings
const lines    = clc.move.lines
const normal   = clc.bold.xterm(243)
const enabled  = clc.bold.xterm(28)
const disabled = clc.bold.xterm(7)

// Move cursor by nth lines
const move = (nth = 0) => {

  const data = lines(nth)
  process.stdout.write(data)

}

// Write default style
const log = (input) => {

  const data = normal(input);
  process.stdout.write(`${data}\n`)

}

// Create a list item with either active or inactive state
const list = (input, active) => {

  const data   = active ? enabled(input) : disabled(input)
  const bullet = active ? enabled('●') : disabled('○')

  process.stdout.write(`${bullet} ${data}\n`)

}

// Write empty line
const line = () => process.stdout.write(`\n`)

// Exporter
module.exports = { move, log, list, line }
