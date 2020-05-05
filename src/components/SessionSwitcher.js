import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import map from 'lodash/fp/map'
import { listenSession, findSessionByCode } from '../api/sessions/repository'
import { listenUsers, fetchUser } from '../api/users/repository'
import { listenQuestion } from '../api/questions/repository'
import { listenAnswers } from '../api/answers/repository'
import { getSessionByCode } from '../selectors/sessions'
import { getCurrentUser, getUserById } from '../selectors/users'
import { getQuestionById } from '../selectors/questions'
import Lobby from '../screens/Lobby'
import JoinSession from '../screens/JoinSession'
import PlaySession from '../screens/PlaySession'
import UnfoundSession from '../screens/UnfoundSession'

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
    const { session, question } = this.props
    if (prevProps.session !== session) {
      await listenQuestion({
        ids: [session.currentQuestion]
      })
      get('users', session) &&  await listenUsers({
        ids: session.users
      })
    }
    if (prevProps.question !== question) {
      await listenAnswers({
        ids: get('answers', question)
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
        return session ? <JoinSession session={session} /> : <UnfoundSession />
    }
  }
}

const mapStateToProps = (state, { match }) => {
  const currentUser = getCurrentUser(state)
  const session = getSessionByCode(state, get('params.code', match))
  return {
    session,
    user: getUserById(state, get('id', currentUser)),
    question: getQuestionById(state, get('currentQuestion', session))
  }
}

export default connect(mapStateToProps)(SessionSwitcher)