import { getEntities, getEntitiesObject, getEntityById  } from './entities'
import { createSelector } from 'reselect'
import filter from 'lodash/fp/filter'

export const getAnswersObject = state => getEntitiesObject(state, 'answers')

export const getAnswers = state => getEntities(state, 'answers')

export const getAnswerById = (state, id) => getEntityById(state, 'answers', id)

export const getAnswersByQuestionId = createSelector(
  [getAnswers, (...args) => args[1]],
  (answers, questionId) => filter(answer => answer.questionId === questionId, answers)
)