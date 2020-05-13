import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import sample from 'lodash/fp/sample'
import flow from 'lodash/fp/flow'
import head from 'lodash/fp/head'
import last from 'lodash/fp/last'
import findIndex from 'lodash/fp/findIndex'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import includes from 'lodash/fp/includes'

export const isSessionCreator = (session, userId) => get('createdBy', session) === userId
export const isLoser = (losers, userId) => includes(userId, losers)

export const setQuizMaster = flow(
  sample,
  get('id')
)

export const setPlayers = ({ quizMaster, users, loserId = undefined }) => {
  const sortedUsers = flow(
    filter(user => user.id !== quizMaster),
    users => map(user => ({
      ...user,
      canPlay: !!loserId && user.id === loserId ? false : true
    }), users)
  )(users)
  return sortedUsers
}

export const setPlayerTurn = (players, playerTurn) => {
  const filteredPlayers = filter(player => player.canPlay, players)
  const playerTurnIndex = findIndex(p => p.id === playerTurn,filteredPlayers)
  if (playerTurn === get('id', last(filteredPlayers))) {
    return get('id', head(filteredPlayers))
  } else {
    return get('id', getOr(0, playerTurnIndex + 1, filteredPlayers))
  }
}
