import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import { Typography } from '@material-ui/core'
import Avatar from '../Avatar'
import Step from './steps'
import { getQuestionById } from '../../selectors/questions'
import { getPlayerTurn } from '../../utils/users'

const StyledInstruction = styled.div`
  margin: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Instructions = ({ data }) => 
  <StyledInstruction>
    {get('user', data) && <Avatar height={60} avatar={get('user', data)} margin="5px 10px" />}
    <Typography variant="h6">
      {get('title', data)}
    </Typography>
  </StyledInstruction>

const StyledDesk = styled.div`
  position: relative;
  background-color: rgba(0,0,0,0.8);
  border-radius: 10px;
  width: 80%;
  height: 100vh;
  margin: 10px;
`

const Desk = ({ quizMaster, isQuizMaster, session, question }) => {
  const userTurn = getPlayerTurn(session.players, session.playerTurn)

  const getInstructionsContent = () => {
    switch (true) {
      case !has('currentQuestion', session):
        return {
          user: quizMaster.avatar,
          title: `${quizMaster.name} est en train de choisir une question`
        }
      case has('answers', question) && get('needVote', question):
        return {
          user: quizMaster.avatar,
          title: `Vote du Quiz Master...`
        }
      case has('currentQuestion', session) && has('playerTurn', session):
        return {
          user: userTurn.avatar,
          title: `Au tour de ${userTurn.name} de répondre`
        }
      default:
        return null
    }
  }
  const instructions = getInstructionsContent()
  return (
    <StyledDesk>
      <Instructions data={instructions} />
      <Step isQuizMaster={isQuizMaster} session={session} userTurn={userTurn} />
    </StyledDesk>
  )
}

const mapStateToProps = (state, { session }) => ({
  question: getQuestionById(state, get('currentQuestion', session))
})

export default connect(mapStateToProps)(Desk)