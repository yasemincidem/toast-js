# toasti

> toasti is a simple notification for javascript, with no dependencies

## Demo
![Alt text](/demo.gif?raw=true "Demo")

## Features

* Pure JavaScript, no dependencies
* Easily customizable
* Change colors to match your style/brand
* Change text
* Change time at staying at screen
* Make it sticky with "stay" option
* Change position("toast-bottom-left", "toast-bottom-right", "toast-top-left", "toast-top-right")

## Installation

#### npm:
```bash
npm install toasti
```

## Usage

#### ES6:
```js
import toasti from 'toasti'
// or
import { success, error, warning, info } from 'toasti'
```

#### Available methods:
```js
toasti.success({
type: Number|String, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
text: String,
stay: Boolean, // optional, default = false
time: Number, // optional, default = 3, minimum = 1,
position: String // optional, default = 'toast-top-right', enum: ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left']
})
toasti.warning({
type: Number|String, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
text: String,
stay: Boolean, // optional, default = false
time: Number, // optional, default = 3, minimum = 1,
position: String // optional, default = 'toast-top-right', enum: ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left']
})
toasti.info({
type: Number|String, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
text: String,
stay: Boolean, // optional, default = false
time: Number, // optional, default = 3, minimum = 1,
position: String // optional, default = 'toast-top-right', enum: ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left']
})
toasti.error({
type: Number|String, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
text: String,
stay: Boolean, // optional, default = false
time: Number, // optional, default = 3, minimum = 1,
position: String // optional, default = 'toast-top-right', enum: ['toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left']
})
toasti.clearAll()
```
## License
MIT
