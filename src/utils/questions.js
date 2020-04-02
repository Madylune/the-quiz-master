import shuffle from 'lodash/fp/shuffle'
import sampleSize from 'lodash/fp/sampleSize'
import { QUESTIONS } from '../fixtures/questions'

export const sampleQuestions = () => {
  const questions = shuffle(QUESTIONS)
  return sampleSize(3, questions)
}