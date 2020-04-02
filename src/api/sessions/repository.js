import { dispatch } from '../../store'
import { SESSIONS_CREATE_ERROR } from '../../actions/sessions'
import { generateCode } from '../../utils/sessions'
import { getFirebaseUser, timestamp } from '../firebase'
import { listen, stopListen, create, fetch, fetchByCode, updateUsers, leaveUsers } from './index'
import get from 'lodash/fp/get'
import { normalize } from '../../schema'
import { updateEntities } from '../../actions/entities' 
import { createUser, updateUser } from '../../api/users/repository'

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
  
}