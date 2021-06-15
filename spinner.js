const process = require('process')
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
const std = OUTPUT_STREAM[colorSupport.level]

function Spinner(textStr = '') {
  let text = textStr
  let timer = null

  return {
    text,
    timer,
    stopAndPrint({ color, symbol }) {
      clearInterval(this.timer)
      let colorFn = c[color]
      std.clearLine()
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
      std.clearLine()
      std.write(`${c.yellow(line)} ${this.text}`)

      std.cursorTo(0)

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
// const spinner = Spinner('Loooool')
// spinner.start()
// setTimeout(() => [
//   spinner.fail()
// ], 3000)
