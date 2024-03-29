import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

// eslint-disable-next-line no-magic-numbers
let viewHeight = window.innerHeight
document.documentElement.style.setProperty('--vh', `${viewHeight}px`)

window.addEventListener('resize', () => {
    // eslint-disable-next-line no-magic-numbers
    viewHeight = window.innerHeight
    document.documentElement.style.setProperty('--vh', `${viewHeight}px`)
})

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
