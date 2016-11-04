// Dependencies
const clc = require('cli-color')

// Settingsc
const screen   = clc.reset
const lines    = clc.move.lines
const normal   = clc.xterm(245)
const green    = clc.bold.xterm(231).bgXterm(64)
const enabled  = clc.bold.xterm(64)
const disabled = clc.xterm(245)

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

// Write success style
const success = (input) => {

  const data = green(` ✔︎ ${input} `);
  process.stdout.write(`${data}\n`)

}

// Create a list item with either active or inactive state
const list = (input, { type }) => {

  let data, bullet

  switch (type) {
    case 'off':
      data   = disabled(input)
      bullet = disabled('○')
    break

    case 'on':
      data   = enabled(input)
      bullet = enabled('●')
    break

    case 'done':
      data   = disabled(input)
      bullet = disabled('●')
    break
  }

  process.stdout.write(`${bullet} ${data}\n`)

}

// Clear screen
const clear = () => process.stdout.write(screen)

// Write empty line
const line = () => process.stdout.write(`\n`)

// Exporter
module.exports = { clear, move, log, success, list, line }
