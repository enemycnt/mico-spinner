const process = require('process')
const readline = require('readline')
const colorSupport = require('color-support')
const c = require('ansi-colors');

const spinnersList = require('./spinnerAnimation')
const logSymbols = require('./logSymbols')
const {show: showCursor, hide: hideCursor} = require('./cursor')

c.enabled = colorSupport.hasBasic
const OUTPUT_STREAM = {
  1: process.stdout,
  2: process.stderr
}
const std = process.stdout

function Spinner(textStr = '') {
  let text = textStr
  let timer = null

  return {
    text,
    timer,
    stopAndPrint({ color, symbol }) {
      clearInterval(this.timer)
      let colorFn = c[color]
      readline.clearLine(std)
      std.write(`${colorFn(symbol)} ${this.text}\n`)

      showCursor()
      return this
    },
    fail() {
      return this.stopAndPrint({ color: 'red', symbol: logSymbols.error })
    },
    succeed() {
      return this.stopAndPrint({ color: 'green', symbol: logSymbols.success })
    },
    start() {
      hideCursor()

      let spinners = spinnersList
      let index = 0

      this.timer = setInterval(() => {
        index = this.intervalCallback(index, spinners)
      }, 100)
      return this
    },
    intervalCallback(index, spinners) {
      let line = spinners[index]

      if (line === undefined) {
        index = 0
        line = spinners[index]
      }
      readline.clearLine(std)
      std.write(`${c.yellow(line)} ${this.text}`)

      readline.cursorTo(std, 0)

      return index + 1
    },
    stop() {
      clearInterval(this.timer)

      std.clearLine()

      showCursor()
      return this
    }
  }
}

module.exports = Spinner
