import Spinner from '../'

const spinner = Spinner('test').start()
setTimeout(() => {
  spinner.succeed()
}, 3000)
