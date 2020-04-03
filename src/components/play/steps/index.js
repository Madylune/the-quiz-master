import React from 'react'
import { connect } from 'react-redux'
import has from 'lodash/fp/has'
import get from 'lodash/fp/get'
import Question from './Question'
import Answers from './Answers'
import Vote from './Vote'
import { getQuestionById } from '../../../selectors/questions'

const Step = ({ isQuizMaster, session, userTurn, question }) => {
  switch (true) {
    case isQuizMaster && !has('currentQuestion', session):
      return <Question session={session} />
    case has('currentQuestion', session):
      return <Answers question={question} userTurn={userTurn} />
    case '':
      return <Vote session={session} />
    default:
      return null
  }
}

const mapStateToProps = (state, { session }) => ({
  question: getQuestionById(state, get('currentQuestion', session))
})

export default connect(mapStateToProps)(Step)