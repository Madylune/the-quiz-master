import pick from 'lodash/pick'
import get from 'lodash/fp/get'
import { timestamp } from '../firebase'
import cleanSpec from '../spec'

export const sessionEntity = ({ data, user }) => 
  cleanSpec({
    ...pick(data, [
      'id',
      'code',
      'questions',
      'currentQuestion',
      'startedAt',
      'createdAt',
      'createdBy'
    ]),
    lastUpdatedBy: get('uid', user),
    lastUpdatedAt: timestamp
  })