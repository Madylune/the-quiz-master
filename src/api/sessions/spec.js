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
      'rounds', // Nombre total de rounds
      'questions', // Les 3 questions par round
      'currentRound', // N° du round en cours
      'currentRoundAt', // Début du round
      'currentQuestion', // Titre de la question en cours
      'quizMaster',
      'playerTurn',
      'startedAt',
      'createdAt',
      'createdBy'
    ]),
    lastUpdatedBy: get('uid', user),
    lastUpdatedAt: timestamp
  })