import pick from 'lodash/pick'
import get from 'lodash/fp/get'
import { timestamp } from '../firebase'
import cleanSpec from '../spec'

export const answerEntity = ({ data, user }) => 
  cleanSpec({
    ...pick(data, [
      'id',
      'value',
      'questionId',
      'createdAt',
      'createdBy'
    ]),
    lastUpdatedBy: get('uid', user),
    lastUpdatedAt: timestamp
  })