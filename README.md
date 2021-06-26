# mico-spinner

Minimal spinner for Node.js.

* Only single dependency ([colorette](https://github.com/jorgebucaran/colorette)) without sub-dependencies.
* Detects Unicode and color support in terminal.

## Usage

```js
let micoSpinner = require('mico-spinner')

let spinner = micoSpinner('Long task').start()
try {
  await longTask()
  spinner.succeed()
} catch (e) {
  spinner.fail()
  console.error(e.stack)
}
```





