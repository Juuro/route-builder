import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/reducers'

const middleware = []
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
