import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import { getCurrentUser } from '../../../selectors/users'
import { Typography, TextField } from '@material-ui/core'
import { createAnswer, listenAnswers } from '../../../api/answers/repository'

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

class Answers extends Component {
  state = {
    value: undefined
  }

  componentDidUpdate = async (prevProps) => {
    const { question } = this.props
    if (prevProps.question !== question) {
      await listenAnswers({
        ids: [question.answers]
      })
    }
  }

  onAnswerChange = e => this.setState({ answer: e.target.value })

  onKeyPress = async e => {
    const { question } = this.props
    const { value } = this.state
    if (get('key', e) === 'Enter') {
      await createAnswer({
        questionId: get('title', question),
        value
      })
    }
  }
  
  render() {
    const { userTurn, currentUser, question } = this.props
    return (
      <StyledAnswers>
        <StyledQuestion>
          <Typography variant="h5">
            {get('title', question)}
          </Typography>
        </StyledQuestion>
        {userTurn.id === currentUser.id && (
          <StyledInput 
            placeholder="Ta réponse" 
            onChange={this.onAnswerChange}
            onKeyPress={this.onKeyPress}
          />
        )}
      </StyledAnswers>
    )
  }
}

const mapStateToProps = (state, { question }) => ({
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(Answers)