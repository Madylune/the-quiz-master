import { combineReducers } from 'redux'
import entities from './entities'
import currentUser from './currentUser'
import clock from './clock'

const reducers = combineReducers({
  entities,
  currentUser,
  clock
})

export default reducers