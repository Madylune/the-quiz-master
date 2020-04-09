import { CLOCK_SET_TIME_OVER } from '../actions/clock'
import get from 'lodash/fp/get'

const initialState = {
  timeOver: false
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLOCK_SET_TIME_OVER:
      return {
        ...state,
        timeOver: get('timeOver', payload)
      }
    default:
      return state
  }
}

export default reducer