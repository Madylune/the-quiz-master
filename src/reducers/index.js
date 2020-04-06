import { combineReducers } from 'redux'
import entities from './entities'
import currentUser from './currentUser'
import cards from './cards'

const reducers = combineReducers({
  entities,
  currentUser,
  cards
})

export default reducers