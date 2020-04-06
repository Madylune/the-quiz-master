import React from 'react'
import { connect } from 'react-redux'
import has from 'lodash/fp/has'
import get from 'lodash/fp/get'
import Question from './Question'
import Answers from './Answers'
import { getQuestionById } from '../../../selectors/questions'

const Step = ({ isQuizMaster, session, question, userTurn }) => {
  switch (true) {
    case isQuizMaster && !has('currentQuestion', session):
      return <Question session={session} />
    case has('currentQuestion', session) && has('playerTurn', session):
      return <Answers question={question} session={session} userTurn={userTurn} />
    case get('currentRound', session) === get('rounds', session) && has('loser', question):
      return <div>Finito</div>
    default:
      return null
  }
}

const mapStateToProps = (state, { session }) => ({
  question: getQuestionById(state, get('currentQuestion', session))
})

export default connect(mapStateToProps)(Step)