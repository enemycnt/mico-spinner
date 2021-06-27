const Spinner = require('../index')

let spinner = Spinner('Loading').start()
setTimeout(() => {
  spinner.fail()
}, 3000)
