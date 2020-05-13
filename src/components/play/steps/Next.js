import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import get from 'lodash/fp/get'
import { getQuizMasterBySessionId } from '../../../selectors/sessions'
import { getCurrentUser, getUsersByIds } from '../../../selectors/users'
import { getAnswers } from '../../../selectors/answers'
import { updateSession } from '../../../api/sessions/repository'
import { calcUsersScore } from '../../../utils/users'

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

  const usersData = calcUsersScore({ answers, session, quizMaster, users })

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