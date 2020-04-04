import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import {
  listenFirebaseNode, 
  getFirebaseUser,
  addFirebaseNode,
  updateFirebaseNode
} from '../firebase'
import { questionEntity } from './spec'

const PATH = '/questions'

export const listen = async (data, cb) => {
  const ids = getOr([], 'ids', data)
  ids.forEach(id => {
    listenFirebaseNode({
      path: `${PATH}/${id}`,
      onData: cb
    })
  })
}

export const create = async data => {
  const user = await getFirebaseUser()
  const entity = questionEntity({ data, user })
  const question = await addFirebaseNode({
    path: PATH,
    entity
  })
  return question
}

export const update = async data => {
  const id = get('id', data)
  const user = await getFirebaseUser()
  const entity = questionEntity({ data, user })
  const question = await updateFirebaseNode({
    path: `${PATH}/${id}`,
    entity
  })
  return question
}