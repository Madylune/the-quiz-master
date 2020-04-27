import React from 'react'
import { connect } from 'react-redux'
import has from 'lodash/fp/has'
import get from 'lodash/fp/get'
import size from 'lodash/fp/size'
import Question from './Question'
import Answers from './Answers'
import Results from './Results'
import Next from './Next'
import { getQuestionById } from '../../../selectors/questions'

const Step = ({ isQuizMaster, session, question, userTurn }) => { 
  switch (true) {
    case get('currentRound', session) > get('rounds', session):
      return <Results />
    case get('losers', question) && size(get('losers', question)) === (size(get('players', session)) - 1):
      return <Next session={session} />
    case isQuizMaster && !has('currentQuestion', session):
      return <Question session={session} isQuizMaster={isQuizMaster} />
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