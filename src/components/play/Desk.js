import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import has from 'lodash/fp/has'
import flow from 'lodash/fp/flow'
import orderBy from 'lodash/fp/orderBy'
import head from 'lodash/fp/head'
import size from 'lodash/fp/size'
import difference from 'lodash/fp/difference'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import { Typography } from '@material-ui/core'
import Avatar from '../Avatar'
import Step from './steps'
import { getQuestionById } from '../../selectors/questions'
import { getUsersByIds } from '../../selectors/users'
import { getPlayerTurn } from '../../utils/users'
import { BREAKPOINTS } from '../../theme'

const StyledInstruction = styled.div`
  margin: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTypography = styled(Typography)`
  @media (max-width: ${BREAKPOINTS.xs}) {
    font-size: 18px;
  }
`

const Instructions = ({ data }) => 
  <StyledInstruction>
    {get('user', data) && <Avatar height={60} avatar={get('user', data)} margin="5px 10px" />}
    <StyledTypography variant="h6">
      {get('title', data)}
    </StyledTypography>
  </StyledInstruction>

const StyledDesk = styled.div`
  position: relative;
  background-color: rgba(0,0,0,0.8);
  border-radius: 10px;
  width: 80%;
  height: 100vh;
  margin: 10px;

  @media (max-width: ${BREAKPOINTS.xs}) {
    width: 100%;
    margin: 0;
  }
`

const Desk = ({ quizMaster, isQuizMaster, session, question, users }) => {
  const userTurn = getPlayerTurn(session.players, session.playerTurn)
  const sessionWinner = flow(
    orderBy(['score'], ['desc']),
    head,
    user => find({ id: user.userId }, users)
  )(get('scores', session))
  const losers = get('losers', question)
  const roundWinner = flow(
    flow(
      map('id'),
      players => difference(players, losers)
    ),
    head,
    id => find({ id }, users)
  )(get('players', session))

  const getInstructionsContent = () => {
    switch (true) {
      // Fin de partie
      case get('currentRound', session) > get('rounds', session):
        return {
          user: get('avatar', sessionWinner),
          title: `${get('name', sessionWinner)} a gagné la partie !`
        }
      // Nouveau tour: Choix question
      case !has('currentQuestion', session):
        return {
          user: get('avatar', quizMaster),
          title: `${get('name', quizMaster)} est en train de choisir une question`
        }
      // Vote
      case has('answers', question) && get('needVote', question):
        return {
          user: get('avatar', quizMaster),
          title: `Vote du Quiz Master...`
        }
      // Fin de tour
      case size(losers) === size(get('players', session)):
        return {
          user: get('avatar', roundWinner),
          title: roundWinner ? `${get('name', roundWinner)} a remporté le tour !` : 'Fin du tour'
        }
      // Tour d'un joueur: Ecrire une réponse
      case has('currentQuestion', session) && has('playerTurn', session):
        return {
          user: get('avatar', userTurn),
          title: `Au tour de ${get('name', userTurn)} de répondre`
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

const mapStateToProps = (state, { session }) => {
  const question = getQuestionById(state, get('currentQuestion', session))
  return {
    question,
    users: getUsersByIds(state, session.users),
  }
}

export default connect(mapStateToProps)(Desk)