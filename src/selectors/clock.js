import get from 'lodash/fp/get'

export const getTimeOver = state => get('clock.timeOver', state)