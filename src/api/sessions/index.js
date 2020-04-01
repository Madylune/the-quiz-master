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

