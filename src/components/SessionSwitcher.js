import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
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

    sessionId && listenSession({
      ids: [sessionId]
    })
    if (session) {
      await listenUsers({
        ids: session.users
      })
      await listenQuestion({
        ids: [session.currentQuestion]
      })
      await fetchUser()
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