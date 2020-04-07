import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import sortBy from 'lodash/fp/sortBy'
import { getUsersByIds, getCurrentUser } from '../selectors/users'
import Desk from '../components/play/Desk'
import Avatar from '../components/Avatar'
import Crown from '../components/Crown'
import Card from '../components/Card'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { getPath } from '../routes'
import { BREAKPOINTS } from '../theme'

const StyledPlaySession = styled.div`
  margin: 0;
  padding: 0;
  background-image: url(${require('../assets/img/bg.jpg')});
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINTS.xs}) {
    overflow: scroll;
    flex-direction: column-reverse;
  }
`

const StyledRounds = styled.div`
  font-weight: bold;
  margin: 10px;
`

const StyledPlayers = styled.div`
  overflow-y: scroll;
  height: 90%;
`

const StyledUsers = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 20%;
  height: 100vh;
  margin: 10px;

  @media (max-width: ${BREAKPOINTS.xs}) {
    width: 100%;
    margin: 0;
  }
`

const StyledUser = styled.div`
  margin: 10px 5px;
  .Username{
    margin: 5px;
    font-size: 18px;
  }
`

const StyledExit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  svg {
    margin: 0 10px;
  }
`

const StyledCards = styled.div`
  display: flex;
`

const PlaySession = ({ history, session, users, currentUser }) => {
  const quizMaster = find(user => user.id === get('quizMaster', session), users)
  const isQuizMaster = get('id', currentUser) === get('id', quizMaster)
  const players = get('players', session)
  
  const onExit = () => history.push(getPath('home'))

  return (
    <StyledPlaySession>
      <StyledContent>
        <StyledUsers>
          <StyledRounds>
            Round: {get('currentRound', session) > get('rounds', session) ? get('rounds', session) : get('currentRound', session) } / {get('rounds', session)}
          </StyledRounds>
          <StyledPlayers>
            {!!quizMaster && (
              <StyledUser>
                <Avatar height={45} avatar={get('avatar', quizMaster)} />
                <span className="Username">{get('name', quizMaster)}</span>
                <Crown height={20} />
                <StyledCards>
                  {map(card => 
                    <Card key={card.id} card={card} isCurrentUser={get('id', currentUser) === get('id', quizMaster)} />
                  , get('cards', quizMaster))}
                </StyledCards>
              </StyledUser>
            )}

            {!!players && map(player =>
              <StyledUser key={get('id', player)}>
                <Avatar height={45} avatar={get('avatar', player)} />
                <span className="Username">{get('name', player)}</span>
                <StyledCards>
                  {map(card => 
                    <Card key={card.id} card={card} isCurrentUser={get('id', currentUser) === get('id', player)} />
                  , get('cards', find( { id: player.id }, users)))}
                </StyledCards>
              </StyledUser>
            , sortBy('order', players))}
          </StyledPlayers>
          <StyledExit onClick={onExit}>
            Sortir <ExitToAppIcon />
          </StyledExit>
        </StyledUsers>

        <Desk 
          isQuizMaster={isQuizMaster}
          quizMaster={quizMaster}
          session={session}
          users={users}
        />
      </StyledContent>
    </StyledPlaySession>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, session.users),
  currentUser: getCurrentUser(state)
})

export default withRouter(connect(mapStateToProps)(PlaySession))