import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cardioStatsReducer from './allCardioStatsStore'
import singleCardioStatReducer from './singleCardioStatStore';
import auth from './auth'

const reducer = combineReducers({ auth,
  allCardioStats: cardioStatsReducer,
  singleCardioStat: singleCardioStatReducer,
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
