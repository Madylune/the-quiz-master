import get from 'lodash/fp/get'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId

export const setQuizMaster = flow(
  sample,
  get('id')
)

export const shuffleUsers = users => shuffle(users) 