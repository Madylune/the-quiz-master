import get from 'lodash/fp/get'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'
import { initCards } from './cards'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId

export const setQuizMaster = flow(
  sample,
  get('id')
)

export const getPlayers = (quizMaster, users) => {
  const sortedUsers = shuffle(users.filter(user => user.id !== quizMaster))
  return sortedUsers.map((user, i) => ({
      ...user,
      order: i,
      cards: initCards()
    })
  )
}