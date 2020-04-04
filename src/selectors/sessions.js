import { createSelector } from 'reselect'
import { getEntities, getEntitiesObject, getEntityById  } from './entities'
import find from 'lodash/fp/find'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'

export const getSessionsObject = state => getEntitiesObject(state, 'sessions')

export const getSessions = state => getEntities(state, 'sessions')

export const getSessionById = (state, id) => getEntityById(state, 'sessions', id)

export const getSessionByCode = createSelector(
  [getSessions, (...args) => args[1]],
  (sessions, code) => find(session => parseInt(session.code, 10) === parseInt(code, 10), sessions)
)

export const getQuizMasterBySessionId = createSelector(
  [getSessions, (...args) => args[1]],
  (sessions, sessionId) => flow(
    find({ id: sessionId }),
    get('quizMaster')
  )(sessions)
)