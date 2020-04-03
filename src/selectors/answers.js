import { getEntities, getEntitiesObject, getEntityById  } from './entities'

export const getanswersObject = state => getEntitiesObject(state, 'answers')

export const getanswers = state => getEntities(state, 'answers')

export const getanswerById = (state, id) => getEntityById(state, 'answers', id)