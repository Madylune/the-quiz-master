import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import has from 'lodash/fp/has'
import reverse from 'lodash/fp/reverse'
import { Typography, TextField } from '@material-ui/core'
import { createAnswer, listenAnswers } from '../../../api/answers/repository'
import { updateQuestion } from '../../../api/questions/repository'
import { updateSession } from '../../../api/sessions/repository'
import { getCurrentUser, getLoserByUserId, getUsersByIds } from '../../../selectors/users'
import { getAnswersByQuestionId } from '../../../selectors/answers'
import { getTimeOver } from '../../../selectors/clock'
import Answer from './Answer'
import Clock from '../../Clock'
import { isSafari, isMobileSafari } from 'react-device-detect'

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
  text-align: center;
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

const allowedSound = !isSafari && !isMobileSafari

class Answers extends Component {
  state = {
    answer: undefined
  }

  componentDidMount() {
    const { currentUser, question, userTurn } = this.props
    var sound = document.querySelector('.Audio')
    get('id', userTurn) === get('id',currentUser) && !get('needVote', question) && !has('loser', question) && allowedSound && sound.play()
  }

  componentDidUpdate = async (prevProps) => {
    const { question, timeIsOver, userTurn, currentUser } = this.props
    if (prevProps.question !== question) {
      await listenAnswers({
        ids: question.answers
      })
    }
    if (prevProps.timeIsOver !== timeIsOver) {
      !get('needVote', question) && get('id', userTurn) === get('id',currentUser) && this.sendEmptyAnswer()
    }
  }

  nextPlayer = async userId => {
    const { question, session, users } = this.props
    console.log('debug nextPlayer')
    await updateQuestion({
      ...question,
      needVote: false,
      loser: userId
    })
    await updateSession({
      session,
      type: 'next_player',
      loser: userId,
      users,
      scores: 0
    })
  }

  sendEmptyAnswer = () => {
    const { currentUser } = this.props
    const { answer } = this.state
    !answer && this.nextPlayer(currentUser.id)
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
    const { currentUser, question, answers, session, userTurn } = this.props
    const endTime = get('lastUpdatedAt', question) + (get('delay', session) * 1000)

    return (
      <StyledAnswers>
        <StyledQuestion>
          <Typography variant="h5">
            {get('title', question)}
          </Typography>
        </StyledQuestion>
        {get('id', userTurn) === get('id',currentUser) 
          && !get('needVote', question) 
          && (
          <Clock delay={get('delay', session)} endTime={endTime} stop={get('needVote', question)} />
        )}
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
        {get('id', userTurn) === get('id',currentUser) 
          && !get('needVote', question) 
          && Date.now() < endTime 
          && ( 
          <>
          <StyledInput>
            <StyledTextField
              placeholder="Ta réponse" 
              onChange={this.onAnswerChange}
              onKeyPress={this.onKeyPress}
            />
          </StyledInput>
          <audio className="Audio"
            src={require(`../../../assets/sounds/your_turn.mp3`)}>
          </audio>
        </>
         )} 
      </StyledAnswers>
    )
  }
}

const mapStateToProps = (state, { question, session }) => ({
  currentUser: getCurrentUser(state),
  answers: getAnswersByQuestionId(state, get('id', question)),
  loser: getLoserByUserId(state, get('loser', question)),
  timeIsOver: getTimeOver(state),
  users: getUsersByIds(state, get('users', session))
})

export default connect(mapStateToProps)(Answers)