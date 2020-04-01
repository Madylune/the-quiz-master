import { createSelector } from 'reselect'
import { getEntities, getEntitiesObject, getEntityById  } from './entities'
import find from 'lodash/fp/find'

export const getSessionsObject = state => getEntitiesObject(state, 'sessions')

export const getSessions = state => getEntities(state, 'sessions')

export const getSessionById = (state, id) => getEntityById(state, 'sessions', id)

export const getSessionByCode = createSelector(
  [getSessions, (...args) => args[1]],
  (sessions, code) => find(session => parseInt(session.code, 10) === parseInt(code, 10), sessions)
)