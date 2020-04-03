import { dispatch } from '../../store'
import { getFirebaseUser, timestamp } from '../firebase'
import { listen, create, update } from './index'
import get from 'lodash/fp/get'
import { normalize } from '../../schema'
import { updateEntities } from '../../actions/entities' 

export const listenQuestion = async data => {
  try {
    await listen(data, question => {
      const { entities } = normalize({ question })
      dispatch(updateEntities(entities))
    })
  } catch (e) {
    dispatch({
      type: 'question.create.error',
      payload: {
        msg: 'Impossible de récupérer les informations de la question',
        e
      }
    })
  }
}

export const createQuestion = async data => {
  try {
    const user = await getFirebaseUser()
    const question = await create({
      createdAt: timestamp,
      createdBy: get('uid', user),
      sessionId: data.sessionId,
      title: data.title
    })
    const { entities } = normalize({ question })
    dispatch(updateEntities(entities))
    return question
  } catch (e) {
    dispatch({
      type: 'question.create.error',
      payload: {
        msg: 'Impossible de créer une nouvelle question.',
        e
      }
    })
  }
}

export const updateQuestion = async data => {
  try {
    const entity = {
      ...data
    }
    const question = await update(entity)
    return question
  } catch (e) {
    dispatch({
      type: 'question.create.error',
      payload: {
        msg: 'Impossible de mettre à jour la session.',
        e
      }
    })
  }
}