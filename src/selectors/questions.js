import { getEntities, getEntitiesObject, getEntityById  } from './entities'

export const getQuestionsObject = state => getEntitiesObject(state, 'questions')

export const getQuestions = state => getEntities(state, 'questions')

export const getQuestionById = (state, id) => getEntityById(state, 'questions', id)