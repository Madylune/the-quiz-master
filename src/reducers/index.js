import { combineReducers } from 'redux'
import entities from './entities'
import users from './users'

const reducers = combineReducers({
  entities,
  users
})

export default reducers