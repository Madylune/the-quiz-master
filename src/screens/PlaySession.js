import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import { getUsersByIds, getCurrentUser } from '../selectors/users'
import { getQuestionById } from '../selectors/questions'
import Desk from '../components/play/Desk'
import Avatar from '../components/Avatar'
import Crown from '../components/Crown'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { getPath } from '../routes'
import { BREAKPOINTS } from '../theme'
import { isLoser } from '../utils/users'

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
  opacity: ${props => props.userIsLoser ? 0.5 : 1};
  .Username{
    margin: 5px;
    font-size: 18px;
  }
  .Subtitle {
    font-size: 15px;
  }
  .Points {
    font-style: italic;
    font-weight: bold;
    margin-left: 5px;
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

const PlaySession = ({ history, session, users, currentUser, currentQuestion }) => {
  const quizMaster = find(user => user.id === get('quizMaster', session), users)
  const isQuizMaster = get('id', currentUser) === get('quizMaster', session)
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
                {get('id', quizMaster) === get('id', currentUser) && <span className="Subtitle">(Moi)</span>}
                <Crown height={20} />
                <span className="Points">{getOr(0, 'score', find({ userId: quizMaster.id }, get('scores', session)))} pts</span>
              </StyledUser>
            )}

            {!!players && map(player =>
              <StyledUser key={get('id', player)} userIsLoser={isLoser(get('losers', currentQuestion), player.id)}>
                <Avatar height={45} avatar={get('avatar', player)} />
                <span className="Username">{get('name', player)}</span>
                {get('id', player) === get('id', currentUser) && <span className="Subtitle">(Moi)</span>}
                <span className="Points">{getOr(0, 'score', find({ userId: player.id }, get('scores', session)))} pts</span>
              </StyledUser>
            , players)}
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
  currentUser: getCurrentUser(state),
  currentQuestion: getQuestionById(state, get('currentQuestion', session))
})

export default withRouter(connect(mapStateToProps)(PlaySession))