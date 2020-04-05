import { dispatch } from '../../store'
import { SESSIONS_CREATE_ERROR } from '../../actions/sessions'
import { generateCode } from '../../utils/sessions'
import { getFirebaseUser, timestamp } from '../firebase'
import { listen, stopListen, create, fetch, fetchByCode, updateUsers, leaveUsers, update } from './index'
import get from 'lodash/fp/get'
import { normalize } from '../../schema'
import { updateEntities } from '../../actions/entities' 
import { createUser, updateUser } from '../../api/users/repository'
import { createQuestion } from '../../api/questions/repository'
import { sessionEntity } from './spec'
import { setQuizMaster } from '../../utils/users'
import { sampleQuestions } from '../../utils/questions'
import { setPlayers, setPlayerTurn } from '../../utils/users'

export const listenSession = async data => {
  try {
    await listen(data, session => {
      const { entities } = normalize({ session })
      dispatch(updateEntities(entities))
    })
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de récupérer les informations de la session',
        e
      }
    })
  }
}

export const stopListenSession = async data => {
  try {
    await stopListen(data)
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible d\'arrêter l\'écoute de cette session',
        e
      }
    })
  }
}

export const createSession = async data => {
  try {
    const code = generateCode()
    const user = await createUser({
      name: data.name,
      avatar: data.avatar
    })
    const session = await create({
      code,
      createdAt: timestamp,
      createdBy: get('uid', user)
    })
    await joinSession({
      id: session.id,
      user
    })
    return session
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de créer une nouvelle session.',
        e
      }
    })
  }
}

export const findSessionByCode = async code => {
  try {
    const session = await fetchByCode(code)
    return session
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de trouver la session correspondante.',
        e
      }
    })
  }
}

export const joinSession = async data => {
  try {
    const id = get('id', data)
    const user = get('user', data)
    const session = await fetch({ id })
    await updateUsers({
      ...user,
      sessionId: id
    })
    await updateUser({
      ...user,
      sessionId: session.id
    })
    return session
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de rejoindre la session.',
        e
      }
    })
  }
}

export const leaveSession = async data => {
  try {
    const id = get('id', data)
    const user = await getFirebaseUser()
    const users = await leaveUsers({
      id,
      userId: user.id
    })
    return users
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de quitter la session.',
        e
      }
    })
  }
}

export const startSession = async data => {
  try {
    const user = await getFirebaseUser()
    const quizMaster = setQuizMaster(data.users)
    const entity = sessionEntity({
      data: {
        id: data.id,
        rounds: data.rounds,
        startedAt: timestamp,
        questions: sampleQuestions(),
        currentRound: 1,
        currentRoundAt: timestamp,
        quizMaster,
        players: setPlayers(quizMaster, data.users)
      },
      user
    })
    const session = await update(entity)
    return session
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de démarrer la session.',
        e
      }
    })
  }
}

export const updateSession = async data => {
  try {
    const user = await getFirebaseUser()
    let entity

    if (data.type === 'create_question') {
      const question = await createQuestion({
        sessionId: data.id,
        title: data.questionTitle
      })
      entity = sessionEntity({
        data: {
          id: data.id,
          questionTitle: data.questionTitle,
          playerTurn: data.playerTurn,
          currentQuestion: question.id
        },
        user
      })
    }

    if (data.type === 'next_player') {
      const session = get('session', data)
      entity = sessionEntity({
        data: {
          ...data.session,
          playerTurn: setPlayerTurn(session.players, session.playerTurn)
        },
        user
      })
    }

    const updatedSession = await update(entity)
    return updatedSession
  } catch (e) {
    dispatch({
      type: SESSIONS_CREATE_ERROR,
      payload: {
        msg: 'Impossible de mettre à jour la session.',
        e
      }
    })
  }
}