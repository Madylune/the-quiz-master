import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { getQuizMasterBySessionId } from '../../../selectors/sessions'
import { updateAnswer } from '../../../api/answers/repository'
import { updateQuestion } from '../../../api/questions/repository'
import { updateSession } from '../../../api/sessions/repository'

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
`

const StyledIcons = styled.div``

const StyledCorrect = styled(CheckCircleIcon)`
  color: #00d200;
  cursor: ${props => console.log('debug props', props) || props.mescouilles ? undefined : 'pointer'};
`

const StyledUncorrect = styled(CancelIcon)`
  cursor: pointer;
`

const Answer = ({ answer, quizMaster, currentUser, session }) => {
  const isQuizMaster = get('id', quizMaster) === get('id', currentUser)

  const nextPlayer = async () => {
    await updateQuestion({
      id: answer.questionId,
      needVote: false
    })
    await updateSession({
      session,
      type: 'next_player'
    })
  }

  const onClickCorrect = async () => {
    await updateAnswer({
      id: answer.id,
      isCorrect: true
    })
    await nextPlayer()
  }

  const onClickUncorrect = async () => {
    await updateAnswer({
      id: answer.id,
      isCorrect: false
    })
    await nextPlayer()
  }
   
  return (
    <StyledAnswer>
      {get('title', answer)}
      {isQuizMaster && !has('isCorrect', answer) && (
      <StyledIcons>
        <StyledCorrect onClick={onClickCorrect} />
        <StyledUncorrect color="secondary" onClick={onClickUncorrect} />
      </StyledIcons>
      )}
      {get('isCorrect', answer) && <CheckCircleIcon />}
    </StyledAnswer>
  )
}

const mapStateToProps = (state, { session }) => ({
  quizMaster: getQuizMasterBySessionId(state, session.id)
})

export default connect(mapStateToProps)(Answer)