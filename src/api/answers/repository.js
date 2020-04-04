import { dispatch } from '../../store'
import { getFirebaseUser, timestamp } from '../firebase'
import { listen, create, update } from './index'
import get from 'lodash/fp/get'
import { normalize } from '../../schema'
import { updateEntities } from '../../actions/entities' 
import { updateQuestion } from '../questions/repository'

export const listenAnswers = async data => {
  try {
    await listen(data, answer => {
      const { entities } = normalize({ answer })
      dispatch(updateEntities(entities))
    })
  } catch (e) {
    dispatch({
      type: 'answer.create.error',
      payload: {
        msg: 'Impossible de récupérer les informations de la réponse',
        e
      }
    })
  }
}

export const createAnswer = async data => {
  try {
    const user = await getFirebaseUser()
    const answer = await create({
      createdAt: timestamp,
      createdBy: get('uid', user),
      questionId: data.question.id,
      title: data.title
    })
    await updateQuestion({
      question: data.question,
      answerId: answer.id,
      needVote: true
    })
    const { entities } = normalize({ answer })
    dispatch(updateEntities(entities))
    return answer
  } catch (e) {
    dispatch({
      type: 'answer.create.error',
      payload: {
        msg: 'Impossible de créer une nouvelle réponse.',
        e
      }
    })
  }
}

export const updateAnswer = async data => {
  try {
    const entity = {
      ...data
    }
    const updatedAnswer = await update(entity)
    return updatedAnswer
  } catch (e) {
    dispatch({
      type: 'answer.create.error',
      payload: {
        msg: 'Impossible de mettre à jour la réponse.',
        e
      }
    })
  }
}