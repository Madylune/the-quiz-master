import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import { Typography, TextField } from '@material-ui/core'
import { createAnswer, listenAnswers } from '../../../api/answers/repository'
import { getCurrentUser } from '../../../selectors/users'
import { getAnswersByQuestionId } from '../../../selectors/answers'

const StyledAnswers = styled.div`
  border: 2px solid white;
  border-radius: 5px;
  width: 85%;
  height: 750px;
  margin: 30px auto;
  position: relative;
`

const StyledQuestion = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  width: 60%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`

const StyledAnswersList = styled.div`
  color: #ffffff;
  padding: 30px;
  ul {
    height: 380px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  li {
    margin: 10px 0;
  }
`

const StyledInput = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 5px;
  text-align: center;
`

const StyledTextField = styled(TextField)`
  && {
    background-color: #ffffff;
    width: 85%;
    margin: auto;
    input {
      width: 100%;
      height: 35px;
      padding: 10px;
      font-size: 18px;
    }
  }
`

class Answers extends Component {
  state = {
    answer: undefined
  }

  componentDidUpdate = async (prevProps) => {
    const { question, answers } = this.props
    if (prevProps.question !== question) {
      await listenAnswers({
        ids: question.answers
      })
    }
    if (prevProps.answers !== answers) {
      // console.log('debug ici')
    }
  }

  onAnswerChange = e => this.setState({ answer: e.target.value })

  onKeyPress = async e => {
    const { question } = this.props
    const { answer } = this.state
    if (get('key', e) === 'Enter') {
      await createAnswer({
        question,
        title: answer
      })
    }
  }
  
  render() {
    const { playerTurn, currentUser, question, answers } = this.props
    return (
      <StyledAnswers>
        <StyledQuestion>
          <Typography variant="h5">
            {get('title', question)}
          </Typography>
        </StyledQuestion>
        <StyledAnswersList>
          <Typography variant="h6">Réponses:</Typography>
          <ul>
            {map(answer =>
              <li key={answer.id}>{get('title', answer)}</li>
            , answers)}
          </ul>
        </StyledAnswersList>
        {playerTurn === currentUser.id && (
        <StyledInput>
          <StyledTextField
            placeholder="Ta réponse" 
            onChange={this.onAnswerChange}
            onKeyPress={this.onKeyPress}
          />
        </StyledInput>
        )} 
      </StyledAnswers>
    )
  }
}

const mapStateToProps = (state, { question }) => ({
  currentUser: getCurrentUser(state),
  answers: getAnswersByQuestionId(state, get('id', question))
})

export default connect(mapStateToProps)(Answers)