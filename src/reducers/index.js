import { combineReducers } from 'redux'
import entities from './entities'
import currentUser from './currentUser'

const reducers = combineReducers({
  entities,
  currentUser
})

export default reducers