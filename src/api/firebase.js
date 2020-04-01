import { FIREBASE_CONFIG } from './config'
import get from 'lodash/fp/get'
import times from 'lodash/times'
import size from 'lodash/fp/size'
import firebaseApp from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let app = null
let user = null

const waitUser = app =>
  new Promise(resolve => { 
    app.auth().onAuthStateChanged(user => {
      resolve(user)
    })
  })

const appSignInWithEmailAndPassword = (email, password) => 
  new Promise((resolve, reject) => {
    firebaseApp
      .auth()
      .setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        await firebaseApp.auth().signInWithEmailAndPassword(email, password)
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })

const appSignInAnonymously = () => firebaseApp.auth().signInAnonymously()

const initFirebaseApp = async () => {
  if (app) {
    return app
  }
  app = firebaseApp.initializeApp(FIREBASE_CONFIG)
  return app
}

const initializeUser = async () => {
  user = await waitUser(app)
  return user
}

const initFirebaseConnection = async () => {
  await initFirebaseApp()
  await initializeUser()
  return app
}

export const getFirebaseUser = async () => {
  await initFirebaseConnection()
  user = app.auth().currentUser
  return user
}

export const signInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return Promise.reject('Missing email and password')
  await initFirebaseConnection()
  await signOut()
  await appSignInWithEmailAndPassword(email, password)
  const user = await getFirebaseUser()
  return user
}

export const signInAnonymously = async () => {
  await initFirebaseConnection()
  await signOut()
  await appSignInAnonymously()
  const user = await getFirebaseUser()
  return user
}

export const signOut = async () => {
  await initFirebaseConnection()
  await app.auth().signOut()
}

export const listenFirebaseNode = async ({ path, onData, query = q => q }) => {
  const firebase = await initFirebaseConnection()
  const ref = query(firebase.database().ref(path))
  ref.off()
  ref.on('value', snapshot => {
    const val = snapshot.val()
    onData && onData(val)
  })
  return path
}

export const stopListenFirebaseNode = async ({ path }) => {
  const firebase = await initFirebaseConnection()
  const ref = firebase.database().ref(path)
  ref.off()
}

export const fetchFirebaseNode = async ({ path, query = q => q }) => {
  const firebase = await initFirebaseConnection()
  const snapshot = await query(firebase.database().ref(path)).once('value')
  return snapshot.val()
}

export const addFirebaseNodes = async ({ path, entities }) => {
  const firebase = await initFirebaseConnection()
  const ref = firebase.database().ref(path)
  const ids = await Promise.all(times(size(entities), () => ref.push().key))
  const node = entities.reduce((memo, entity, i) => {
    const id = ids[i]
    return {
      ...memo,
      [id]: {
        id,
        ...entity
      }
    }
  }, {})
  await ref.update(node)
}

export const addFirebaseNode = async ({ path, entity }) => {
  const firebase = await initFirebaseConnection()
  const ref = firebase.database().ref(path)
  const id = await ref.push().key
  const node = {
    id: id,
    ...entity
  }
  await ref.child(id).set(node)
  return node
}

export const updateFirebaseNode = async ({ path, entity, query = q => q }) => {
  const firebase = await initFirebaseConnection()
  const ref = firebase.database().ref(path)
  const id = get('id', entity) ? entity.id : await ref.push().key
  await query(ref).update({
    ...entity,
    id
  })
  return entity
}

export const removeFirebaseNode = async ({ path }) => {
  const firebase = await initFirebaseConnection()
  await firebase
    .database()
    .ref(path)
    .remove()
}

export const timestamp = firebaseApp.database.ServerValue.TIMESTAMP