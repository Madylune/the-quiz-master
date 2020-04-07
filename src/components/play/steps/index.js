import React from 'react'
import { connect } from 'react-redux'
import has from 'lodash/fp/has'
import get from 'lodash/fp/get'
import Question from './Question'
import Answers from './Answers'
import Results from './Results'
import { getQuestionById } from '../../../selectors/questions'

const Step = ({ isQuizMaster, session, question, userTurn }) => {
  switch (true) {
    case get('currentRound', session) > get('rounds', session):
      return <Results>Finito</Results>
    case isQuizMaster && !has('currentQuestion', session):
      return <Question session={session} />
    case has('currentQuestion', session) && has('playerTurn', session):
      return <Answers question={question} session={session} userTurn={userTurn} />
    default:
      return null
  }
}

const mapStateToProps = (state, { session }) => ({
  question: getQuestionById(state, get('currentQuestion', session))
})

export default connect(mapStateToProps)(Step)