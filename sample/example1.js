const Spinner = require('../')

let spinner = Spinner('Loading').start()
setTimeout(() => {
  spinner.succeed()
}, 3000)
