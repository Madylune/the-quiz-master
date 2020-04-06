import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import map from 'lodash/fp/map'
import { listenSession, findSessionByCode } from '../api/sessions/repository'
import { listenUsers, fetchUser } from '../api/users/repository'
import { listenQuestion } from '../api/questions/repository'
import { getSessionByCode } from '../selectors/sessions'
import { getCurrentUser, getUserById } from '../selectors/users'
import Lobby from '../screens/Lobby'
import JoinSession from '../screens/JoinSession'
import PlaySession from '../screens/PlaySession'

class SessionSwitcher extends Component {
  componentDidMount = async () => {
    const { match } = this.props
    const code = get('params.code', match)
    const session = await findSessionByCode({ code })
    const sessionId = get('id', session)

    sessionId && await listenSession({
      ids: [sessionId]
    })

    session && await fetchUser()

    get('users', session) &&  await listenUsers({
      ids: map(user => user.id ,session.users)
    })
    
    get('currentQuestion', session) && await listenQuestion({
      ids: [session.currentQuestion]
    })
  }

  componentDidUpdate = async prevProps => {
    const { session } = this.props
    if (prevProps.session !== session) {
      await listenQuestion({
        ids: [session.currentQuestion]
      })
      get('users', session) &&  await listenUsers({
        ids: session.users
      })
    }
  }

  render() {
    const { session, user } = this.props
    switch (true) {
      case has('startedAt', session):
        return <PlaySession session={session} />
      case get('sessionId', user) === get('id', session):
        return <Lobby session={session} />
      default:
        return <JoinSession session={session} />
    }
  }
}

const mapStateToProps = (state, { match }) => {
  const currentUser = getCurrentUser(state)
  return {
    session: getSessionByCode(state, get('params.code', match)),
    user: getUserById(state, get('id', currentUser))
  }
}

export default connect(mapStateToProps)(SessionSwitcher)