import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import sortBy from 'lodash/fp/sortBy'
import last from 'lodash/fp/last'
import flow from 'lodash/fp/flow'
import {
  listenFirebaseNode, 
  stopListenFirebaseNode,
  fetchFirebaseNode,
  getFirebaseUser,
  addFirebaseNode,
  updateFirebaseNode,
  removeFirebaseNode,
} from '../firebase'
import { sessionEntity } from './spec'
import { userEntity } from '../users/spec'

const PATH = '/sessions'

export const listen = async (data, cb) => {
  const ids = getOr([], 'ids', data)
  ids.forEach(id => {
    listenFirebaseNode({
      path: `${PATH}/${id}`,
      onData: cb
    })
  })
}

export const stopListen = async data => {
  const ids = getOr([], 'ids', data)
  ids.forEach(id => {
    stopListenFirebaseNode({
      path: `${PATH}/${id}`
    })
  })
}

export const fetch = async data => {
  const id = get('id', data)
  const session = await fetchFirebaseNode({
    path: `${PATH}/${id}`
  })
  return session
}

export const fetchByCode = async data => {
  const code = get('code', data)
  const sessions = await fetchFirebaseNode({
    path: PATH,
    query: q => 
      q
        .orderByChild('code')
        .equalTo(code)
        .limitToLast(1)
  })
  const session = flow(
    sortBy('createdAt'),
    last
  )(Object.values(sessions))

  return session
}

export const create = async data => {
  const user = await getFirebaseUser()
  const entity = sessionEntity({ data, user })
  const session = await addFirebaseNode({
    path: PATH,
    entity
  })
  return session
}

export const update = async data => {
  const id = get('id', data)
  const user = await getFirebaseUser()
  const entity = sessionEntity({ data, user })
  const session = await updateFirebaseNode({
    path: `${PATH}/${id}`,
    entity
  })
  return session
}

export const updateUsers = async (data, query) => {
  const sessionId = get('sessionId', data)
  const user = await getFirebaseUser()
  const entity = userEntity({ data, user })
  const updatedUser = await updateFirebaseNode({
    path: `${PATH}/${sessionId}/users/${user.uid}`,
    entity,
    query
  })
  return updatedUser
}

export const leaveUsers = async data => {
  const id = get('id', data)
  const user = await getFirebaseUser()
  const users = await removeFirebaseNode({
    path: `${PATH}/${id}/users/${user.uid}`
  })
  return users
}