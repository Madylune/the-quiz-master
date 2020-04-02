import get from 'lodash/fp/get'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId