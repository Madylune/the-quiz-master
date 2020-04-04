import { dispatch } from '../../store'
import { getFirebaseUser, timestamp } from '../firebase'
import { listen, create, update } from './index'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
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
    const question = get('question', data)
    const entity = {
      ...question,
      answers: [...getOr([], 'answers', question), get('answerId',data)],
      needVote: data.needVote
    }
    const updatedQuestion = await update(entity)
    return updatedQuestion
  } catch (e) {
    dispatch({
      type: 'question.create.error',
      payload: {
        msg: 'Impossible de mettre à jour la question.',
        e
      }
    })
  }
}