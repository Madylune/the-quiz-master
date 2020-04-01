import { createSelector } from 'reselect'
import get from 'lodash/fp/get'
import { getEntityById, getEntitiesObject, getEntitiesByIds } from './entities'

export const getUsersObject = state => getEntitiesObject(state, 'users')

export const getUserById = (state, id) => getEntityById(state, 'users', id)

export const getUsersByIds = (state, ids) => getEntitiesByIds(state, 'users', ids)

export const getCurrentUserId = state => get('users.currentUser', state)

export const getCurrentUser = createSelector(
  [getUsersObject, getCurrentUserId],
  (users, id) => get(id, users)
)