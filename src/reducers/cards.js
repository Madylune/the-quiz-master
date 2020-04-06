import { CARDS_CHANGE_OWNER } from '../actions/cards'

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case CARDS_CHANGE_OWNER:
      return {
        ...state,
        ...payload.transferedCard
      }
    default:
      return state
  }
}

export default reducer