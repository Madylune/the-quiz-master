import get from 'lodash/fp/get'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId

export const setQuizMaster = flow(
  sample,
  get('id')
)