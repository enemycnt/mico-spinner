const process = require('process')
const readline = require('readline')
const c = require('colorette')

const logSymbols = require('./logSymbols')

const std = process.stdout

function Spinner(textStr = '') {
  let text = textStr
  let timer = null

  return {
    text,
    timer,
    stopAndPrint({ color, symbol }) {
      let colorFn = c[color]
      std.write(`${colorFn(symbol)} ${this.text}\n`)
      return this
    },
    fail() {
      return this.stopAndPrint({ color: 'red', symbol: logSymbols.error })
    },
    succeed() {
      return this.stopAndPrint({ color: 'green', symbol: logSymbols.success })
    },
    start() {
      std.write(`${c.yellow('-')} ${this.text}\n`)
      return this
    },
    stop() {
      readline.clearLine(std)

      return this
    }
  }
}

module.exports = Spinner
