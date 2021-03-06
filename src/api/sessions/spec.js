import pick from 'lodash/pick'
import get from 'lodash/fp/get'
import { timestamp } from '../firebase'
import cleanSpec from '../spec'

export const sessionEntity = ({ data, user }) => 
  cleanSpec({
    ...pick(data, [
      'id',
      'code',
      'users', // Tous les joueurs 
      'players', // Les joueurs sans le quiz Master
      'delay',
      'rounds', // Nombre total de rounds
      'currentRound', // N° du round en cours
      'currentRoundAt', // Début du round
      'currentQuestion', // Id de la question
      'quizMaster',
      'playerTurn', // Numéro
      'startedAt',
      'createdAt',
      'createdBy',
      'scores'
    ]),
    lastUpdatedBy: get('uid', user),
    lastUpdatedAt: timestamp
  })