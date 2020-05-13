import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { getQuizMasterBySessionId } from '../../../selectors/sessions'
import { getQuestionById } from '../../../selectors/questions'
import { getUserById, getUsersByIds } from '../../../selectors/users'
import { updateAnswer } from '../../../api/answers/repository'
import { updateQuestion } from '../../../api/questions/repository'
import { updateSession } from '../../../api/sessions/repository'
import Avatar from '../../Avatar'

const StyledAnswer = styled.li`
  background-color: #ffffff;
  list-style: none;
  color: #000000;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  height: 30px;
`

const StyledLeft = styled.div`
  display: flex;
  align-items: center;
`

const StyledIcons = styled.div``

const StyledCorrect = styled(CheckCircleIcon)`
  && {
    color: ${props => props.clickable ? '#00d200' : undefined};
    font-size: 33px;
    cursor: ${props => props.clickable ? 'pointer' : undefined};
  }
`

const StyledUncorrect = styled(CancelIcon)`
  && {
    font-size: 33px;
    cursor: ${props => props.clickable ? 'pointer' : undefined};
  }
`

const Answer = ({ answer, quizMaster, currentUser, session, question, user, users }) => {
  const isQuizMaster = quizMaster === get('id', currentUser)

  const nextPlayer = async ({ user, isLoser }) => {
    await updateQuestion({
      ...question,
      needVote: false,
      loser: isLoser ? user : null
    })
    await updateSession({
      session,
      type: 'next_player',
      loser: isLoser ? user : null,
      users,
      points: isLoser ? 0 : 10
    })
  }

  const onClickCorrect = async () => {
    const user = get('createdBy', answer)
    await updateAnswer({
      id: answer.id,
      isCorrect: true
    })
    await nextPlayer({ user, isLoser: false })
  }

  const onClickUncorrect = async () => {
    const user = get('createdBy', answer)
    await updateAnswer({
      id: answer.id,
      isCorrect: false
    })
    await nextPlayer({ user, isLoser: true })
  }

  return (
    <StyledAnswer>
      <StyledLeft>
        <Avatar height={40} avatar={get('avatar', user)} margin="10px" />
        {get('title', answer)}
      </StyledLeft>
      {isQuizMaster && !has('isCorrect', answer) && (
      <StyledIcons>
        <StyledCorrect onClick={onClickCorrect} clickable={true} />
        <StyledUncorrect color="secondary" onClick={onClickUncorrect} clickable={true}/>
      </StyledIcons>
      )} 
      {get('isCorrect', answer) && <StyledCorrect />}
      {has('isCorrect', answer) && !get('isCorrect', answer) && <StyledUncorrect />}
    </StyledAnswer>
  )
}

const mapStateToProps = (state, { session, answer }) => ({
  quizMaster: getQuizMasterBySessionId(state, session.id),
  question: getQuestionById(state, answer.questionId),
  user: getUserById(state, answer.createdBy),
  users: getUsersByIds(state, get('users', session))
})

export default connect(mapStateToProps)(Answer)