// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import FeedsCategoriesReducer from './app/FeedsCategoriesReducer'
import FeedsReducer from './app/Feeds'

import employeeReducer from './app/Employee'
import trendingReducer from './app/TrendingReducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  FeedsCategoriesReducer,
  FeedsReducer,
  employeeReducer,
  trendingReducer,
})

export default rootReducer
