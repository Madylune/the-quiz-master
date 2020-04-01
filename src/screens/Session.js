import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/fp/get'
import { listenSession, findSessionByCode } from '../api/sessions/repository'
import { getSessionByCode } from '../selectors/sessions'
import Lobby from './Lobby'

class Session extends Component {
  componentDidMount = async () => {
    const { match } = this.props
    const code = get('params.code', match)
    const session = await findSessionByCode({ code })
    const sessionId = get('id', session)
    sessionId && listenSession({
      ids: [sessionId]
    })
  }
  render() {
    const { session } = this.props
    return get('startedAt', session)
      ? <div>Session en cours</div>
      : <Lobby />
  }
}

const mapStateToProps = (state, { match }) => ({
  session: getSessionByCode(state, get('params.code', match))
})

export default connect(mapStateToProps)(Session)