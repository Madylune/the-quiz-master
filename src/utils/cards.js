import shuffle from 'lodash/fp/shuffle'
import sampleSize from 'lodash/fp/sampleSize'
import { CARDS } from '../fixtures/cards'

export const initCards = () => {
  const cards = shuffle(CARDS)
  return sampleSize(3, cards)
}