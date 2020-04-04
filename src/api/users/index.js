import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import {
  getFirebaseUser,
  listenFirebaseNode,
  updateFirebaseNode,
  fetchFirebaseNode,
  signInWithEmailAndPassword,
} from '../firebase'
import { userEntity } from './spec'

const PATH = '/users'

export const login = async data => {
  const email = get('email', data)
  const password = get('password', data)
  const user = await signInWithEmailAndPassword(email, password)
  return user
}

export const listen = async cb => {
  const firebaseUser = await getFirebaseUser()
  firebaseUser && (
    await listenFirebaseNode({
      path: `${PATH}/${firebaseUser.uid}`,
      onData : cb
    })
  )
}

export const listenMultiple = async (data, cb) => {
  const ids = getOr([], 'ids', data)
  ids.forEach(id => {
    listenFirebaseNode({
      path: `${PATH}/${id}`,
      onData: cb
    })
  })
}

export const fetch = async data => {
  const id = get('id', data)
  const user = await fetchFirebaseNode({
    path: `${PATH}/${id}`
  })
  return user
}

export const update = async (data, query) => {
  const firebaseUser = await getFirebaseUser()
  const entity = userEntity({ data, user: firebaseUser })
  const user = await updateFirebaseNode({
    path: `${PATH}/${firebaseUser.uid}`,
    entity,
    query
  })
  return user
}
