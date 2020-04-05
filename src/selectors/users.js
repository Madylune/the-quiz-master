import { getEntityById, getEntitiesObject, getEntitiesByIds } from './entities'
import { createSelector } from 'reselect'
import find from 'lodash/fp/find'
import get from 'lodash/fp/get'

export const getUsersObject = state => getEntitiesObject(state, 'users')

export const getUserById = (state, id) => getEntityById(state, 'users', id)

export const getUsersByIds = (state, ids) => getEntitiesByIds(state, 'users', ids)

export const getCurrentUser = state => get('currentUser', state)

export const getLoserByUserId = createSelector(
  [getUsersObject, (...args) => args[1]],
  (users, userId) => find({ id: userId }, users)
)