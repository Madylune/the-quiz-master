import { combineReducers } from 'redux'
import entities from './entities/reducers'
import users from './users/reducers'

const reducers = combineReducers({
  entities,
  users
})

export default reducers