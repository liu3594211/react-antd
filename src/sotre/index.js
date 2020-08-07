//compose用来增强函数
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import multipleRenducer from './renducer/multipleRenducer'
import addUserRenducer from './renducer/addUserRenducer'
import menusRenducer from './renducer/menusRenducer'
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const combiner = combineReducers({
  addUser: addUserRenducer,
  menus: menusRenducer,
  multip: multipleRenducer,
})

// const store = createStroe(reducer);
const store = createStore(combiner, enhancer)
export default store
