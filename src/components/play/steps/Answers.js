import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import { getCurrentUser } from '../../../selectors/users'
import { Typography, TextField } from '@material-ui/core'

const StyledAnswers = styled.div`
  text-align: center;
`

const StyledQuestion = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  top: 25%;
  left: 20%;
  width: 60%;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled(TextField)`
  && {
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 5px;
    input {
      width: 300px;
      height: 50px;
      padding: 10px;
      font-size: 18px;
    }
  }
`

const Answers = ({ session, userTurn, currentUser }) => {
  const [ answer, setAnswer ] = useState(undefined)
  const onAnswerChange = e => setAnswer(e.target.value)

  const onKeyPress = e => {
    if (get('key', e) === 'Enter') {
      console.log('debug answer', answer)
    }
  }
  return (
    <StyledAnswers>
      <StyledQuestion>
        <Typography variant="h5">
          {session.currentQuestionTitle}
        </Typography>
      </StyledQuestion>
      {userTurn.id === currentUser.id && (
        <StyledInput 
          placeholder="Ta réponse" 
          onChange={onAnswerChange}
          value={answer}
          onKeyPress={onKeyPress}
        />
      )}
    </StyledAnswers>
  )
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(Answers)