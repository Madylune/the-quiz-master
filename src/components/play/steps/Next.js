import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import multiply from 'lodash/fp/multiply'
import add from 'lodash/fp/add'
import find from 'lodash/fp/find'
import { getQuizMasterBySessionId } from '../../../selectors/sessions'
import { getCurrentUser, getUsersByIds } from '../../../selectors/users'
import { getAnswers } from '../../../selectors/answers'
import { updateSession } from '../../../api/sessions/repository'

const StyledNext = styled.div`
  text-align: center;
  margin: 100px;
`

const StyledTypography = styled(Typography)`
  && {
    color: #ffffff;
  }
`

const Next = ({ session, quizMaster, currentUser, users, answers }) => {

  const usersData = map(user => {
    const userPoints = getOr(0, 'score', find({ userId: user.id }, get('scores', session)))
    const score = flow(
      answers => filter({ createdBy: user.id }, answers),
      filter('isCorrect'),
      size,
      add(userPoints),
      points => user.id === quizMaster ? 5 : multiply(points, 10)
    )(answers)

    return ({
      userId: user.id,
      score
    })
  }, users)

  const onNextQuestion = async () => {
    await updateSession({
      session,
      users,
      type: 'next_question',
      scores: usersData
    })
  }
  
  return (
    <StyledNext>
      {quizMaster === get('id', currentUser) 
      ? (
        <Button 
        color="primary" 
        variant="contained" 
        onClick={onNextQuestion}
        >
          Tour suivant
        </Button>
      ) : (
        <StyledTypography variant="h6">
          Le Quiz Master va lancer le prochain tour, tiens-toi prêt !
        </StyledTypography>
      )}
    </StyledNext>
  )
}

const mapStateToProps = (state, { session }) => ({
  quizMaster: getQuizMasterBySessionId(state, session.id),
  currentUser: getCurrentUser(state),
  users: getUsersByIds(state, session.users),
  answers: getAnswers(state)
})

export default connect(mapStateToProps)(Next)