import get from 'lodash/fp/get'

export const getTransferedCard = state => get('cards.transferedCard', state)