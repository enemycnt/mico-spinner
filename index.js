const isInteractive = require('./isInteractive')
const Spinner = require('./spinner')
const PlainSpinner = require('./plainSpinner')

let spinnerFunction = isInteractive() ? Spinner : PlainSpinner

module.exports = spinnerFunction
