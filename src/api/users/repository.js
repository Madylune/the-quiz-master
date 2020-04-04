import { getFirebaseUser, signInAnonymously, listenFirebaseNode, signOut } from '../firebase'
import { update, login, listen, fetch, listenMultiple } from './index'
import { dispatch } from '../../store'
import { normalize } from '../../schema'
import { updateEntities } from '../../actions/entities'
import { USERS_SET_CURRENT_USER } from '../../actions/users'

export const listenUsers = async data => {
  try {
    await listenMultiple(data, user => {
      const { entities } = normalize({ user })
      dispatch(updateEntities(entities))
    })
  } catch (e) {
    dispatch({
      type: 'user.create.error',
      payload: {
        msg: 'Impossible de récupérer les informations de l\'utilisateur',
        e
      }
    })
  }
}

export const listenUser = async () => {
  await listen(user => {
    const { entities: { users } } = normalize({ user })
    dispatch(updateEntities({ users }))
  })
}

export const fetchUser = async () => {
  try {
    const currentFirebaseUser = await getFirebaseUser()
    const firebaseUser = currentFirebaseUser || await signInAnonymously()
    const user = await fetch({ id: firebaseUser.uid })
    await updateUser(user)
    await listenUser()
    return user
  } catch (e) {
    dispatch({
      type: 'error.fetch.user',
      payload: {
        msg: 'Impossible de récupérer l\'utilisateur',
        e
      }
    })
  }
}

export const loginUser = async data => {
  try {
    const user = await login(data)
    await updateUser(user)
    await listenFirebaseNode()
    return user
  } catch (e) {
    dispatch({
      type: 'error.login.user',
      payload: {
        msg: 'Impossible de se connecter',
        e
      }
    })
  }
}

export const logoutUser = async () => {
  try {
    await signOut()
    dispatch({
      type: 'set.current.user',
      payload: {
        user: null
      }
    })
  } catch (e) {
    dispatch({
      type: 'error.logout.user',
      payload: {
        msg: 'Impossible de se déconnecter',
        e
      }
    })
  }
}

export const createUser = async data => {
  const currentUser = await signInAnonymously().then(user => ({
    ...user,
    name: data.name,
    avatar: data.avatar
  }))
  await updateUser(currentUser)
  return currentUser
}

export const updateUser = async (data, cb) => {
  const user = await update(data, cb)
  dispatch({ 
    type: USERS_SET_CURRENT_USER,
    payload: user
  })
}