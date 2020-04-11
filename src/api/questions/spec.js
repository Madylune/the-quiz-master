import pick from 'lodash/pick'
import get from 'lodash/fp/get'
import { timestamp } from '../firebase'
import cleanSpec from '../spec'

export const questionEntity = ({ data, user }) => 
  cleanSpec({
    ...pick(data, [
      'id',
      'title', // Titre de la question
      'sessionId',
      'answers',
      'createdAt',
      'createdBy',
      'needVote',
      'losers',
      'winner'
    ]),
    lastUpdatedBy: get('uid', user),
    lastUpdatedAt: timestamp
  })