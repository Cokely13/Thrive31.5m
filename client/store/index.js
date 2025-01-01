import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import cardioStatsReducer from './allCardioStatsStore'
import singleCardioStatReducer from './singleCardioStatStore';
import strengthStatsReducer from './allStrengthStatsStore';
import singleStrengthStatReducer from './singleStrengthStatStore';
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import auth from './auth'
import singleEventReducer from './singleEventStore'
import eventsReducer from './allEventsStore'

const reducer = combineReducers({ auth,
  allCardioStats: cardioStatsReducer,
  singleCardioStat: singleCardioStatReducer,
  allStrengthStats: strengthStatsReducer,
  singleStrengthStat: singleStrengthStatReducer,
  allUsers: usersReducer,
  singleUser: singleUserReducer,
  allEvents: eventsReducer,
  singleEvent: singleEventReducer,
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
