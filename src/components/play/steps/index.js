import React from 'react'
import has from 'lodash/fp/has'
import Question from './Question'
import Answers from './Answers'
import Vote from './Vote'

const Step = ({ isQuizMaster, session, userTurn }) => {
  switch (true) {
    case isQuizMaster && !has('currentQuestionTitle', session):
      return <Question session={session} />
    case has('currentQuestionTitle', session):
      return <Answers session={session} userTurn={userTurn} />
    case '':
      return <Vote session={session} />
    default:
      return null
  }
}

export default Step