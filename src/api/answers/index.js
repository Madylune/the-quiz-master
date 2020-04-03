import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import {
  listenFirebaseNode, 
  getFirebaseUser,
  addFirebaseNode,
  updateFirebaseNode
} from '../firebase'
import { answerEntity } from './spec'

const PATH = '/answers'

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
  const entity = answerEntity({ data, user })
  const answer = await addFirebaseNode({
    path: PATH,
    entity
  })
  return answer
}

export const update = async data => {
  const id = get('id', data)
  const user = await getFirebaseUser()
  const entity = answerEntity({ data, user })
  const answer = await updateFirebaseNode({
    path: `${PATH}/${id}`,
    entity
  })
  return answer
}
