import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import has from 'lodash/fp/has'
import reverse from 'lodash/fp/reverse'
import { Typography, TextField } from '@material-ui/core'
import { createAnswer, listenAnswers } from '../../../api/answers/repository'
import { getCurrentUser, getLoserByUserId } from '../../../selectors/users'
import { getAnswersByQuestionId } from '../../../selectors/answers'
import Answer from './Answer'
import Cards from './Cards'

const StyledOverlay = styled.div`
  position: absolute;
  background-color: rgba(0,0,0,0.9);
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

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
    flex-direction: column;
    padding: 0;
    overflow-y: scroll;
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
    const { question } = this.props
    if (prevProps.question !== question) {
      await listenAnswers({
        ids: question.answers
      })
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
    const { currentUser, question, answers, session, userTurn, loser } = this.props
    return (
      <StyledAnswers>
        <StyledQuestion>
          <Typography variant="h5">
            {get('title', question)}
          </Typography>
        </StyledQuestion>
        <StyledAnswersList>
          <Typography variant="h6">Réponses:</Typography>
          {answers && (
            <ul>
            {map(answer =>
              <Answer 
                key={get('id',answer)} 
                answer={answer} 
                session={session} 
                currentUser={currentUser}
              />
            , reverse(answers))}
          </ul>
          )}
        </StyledAnswersList>
        {get('id', userTurn) === get('id',currentUser) && !get('needVote', question) && !has('loser', question) && ( 
        <StyledInput>
          <StyledTextField
            placeholder="Ta réponse" 
            onChange={this.onAnswerChange}
            onKeyPress={this.onKeyPress}
          />
        </StyledInput>
         )} 
      {has('loser', question) && (
        <StyledOverlay />
      )}
      {get('id', loser) === get('id', currentUser) && (
        <Cards cards={get('cards', loser)} user={loser} session={session} />
      )}
      </StyledAnswers>
    )
  }
}

const mapStateToProps = (state, { question }) => ({
  currentUser: getCurrentUser(state),
  answers: getAnswersByQuestionId(state, get('id', question)),
  loser: getLoserByUserId(state, get('loser', question))
})

export default connect(mapStateToProps)(Answers)