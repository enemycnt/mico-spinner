const Spinner = require('../plainSpinner')

let spinner = Spinner('Loading').start()
setTimeout(() => {
  spinner.succeed()
}, 3000)
