import { listenFirebaseNode } from '../firebase'
import { dispatch } from '../../store'

const PATH = '.info'

export const listenInfo = async cb => {
  try {
    await listenFirebaseNode({
      path: PATH,
      onData: cb
    })
  } catch (e) {
    dispatch({
      type: 'error.listen.info',
      payload: {
        msg: 'Impossible de récupérer les informations de l\'utilisateur',
        e
      }
    })
  }
}