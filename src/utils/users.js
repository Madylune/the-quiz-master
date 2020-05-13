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
import find from 'lodash/fp/find'
import size from 'lodash/fp/size'
import add from 'lodash/fp/add'
import multiply from 'lodash/fp/multiply'

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

export const calcUsersScore = ({ answers, session, quizMaster, users }) => {
  return map(user => {
    const userPoints = getOr(0, 'score', find({ userId: user.id }, get('scores', session)))
    const score = flow(
      answers => filter({ createdBy: user.id }, answers),
      filter('isCorrect'),
      size,
      points => user.id === quizMaster ? 5 : multiply(points, 10),
      add(userPoints)
    )(answers)

    return ({
      userId: user.id,
      score
    })
  }, users)
}