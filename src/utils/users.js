import get from 'lodash/fp/get'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'
import size from 'lodash/fp/size'
import find from 'lodash/fp/find'
import { initCards } from './cards'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId

export const setQuizMaster = flow(
  sample,
  get('id')
)

export const setPlayers = (quizMaster, users) => {
  const sortedUsers = shuffle(users.filter(user => user.id !== quizMaster))
  return sortedUsers.map((user, i) => ({
      ...user,
      order: i + 1,
      cards: initCards()
    })
  )
}

export const setPlayerTurn = (players, playerTurn) => {
  if (playerTurn === size(players)) {
    return 1
  } else {
    return playerTurn + 1
  }
}

export const getPlayerTurn = (players, playerTurn) => find(player => player.order === playerTurn, players)