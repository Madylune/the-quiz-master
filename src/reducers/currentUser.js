import { USERS_SET_CURRENT_USER } from '../actions/users'

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case USERS_SET_CURRENT_USER:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default reducer