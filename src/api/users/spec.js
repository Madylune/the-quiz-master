import pick from 'lodash/pick'
import getOr from 'lodash/fp/getOr'
import { timestamp } from '../firebase'
import cleanSpec from '../spec'
import get from 'lodash/fp/get'

export const userEntity = ({ data, user }) => 
  cleanSpec({
    ...pick(data, [
      'name',
      'avatar',
      'sessionId',
      'cards',
      'order'
    ]),
    id: get('uid', user),
    createdAt: getOr(timestamp, 'createdAt', data),
    lastUpdatedAt: timestamp
  })
  