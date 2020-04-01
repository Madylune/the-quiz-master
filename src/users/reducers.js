import { USERS_SET_CURRENT_USER } from './actions'

const initialState = {
  currentUser: null
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...payload
        }
      }
    default:
      return state
  }
}

export default reducer