const Spinner = require('../spinner')

let spinner = Spinner('Loading').start()
setTimeout(() => {
  spinner.succeed()
}, 3000)
