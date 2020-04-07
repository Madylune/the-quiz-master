import get from 'lodash/fp/get'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'
import size from 'lodash/fp/size'
import find from 'lodash/fp/find'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId

export const setQuizMaster = flow(
  sample,
  get('id')
)

export const initPlayersOrder = (quizMaster, users) => {
  const sortedUsers = users.filter(user => user.id !== quizMaster)
  return sortedUsers.map((user, i) => ({
      ...user,
      order: i + 1
    })
  )
}

export const setPlayersOrder = (quizMaster, users) => {
  const sortedUsers = users.filter(user => user.id !== quizMaster)
  return sortedUsers.map(user => ({
    ...user,
    order: get('order', user) ? get('order', user) - 1 : size(sortedUsers)
  }))
}

export const setPlayerTurn = (players, playerTurn) => {
  if (playerTurn === size(players)) {
    return 1
  } else {
    return playerTurn + 1
  }
}

export const getPlayerTurn = (players, playerTurn) => find(player => player.order === playerTurn, players)
