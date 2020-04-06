import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { getUsersByIds, getCurrentUser } from '../selectors/users'
import { isSessionCreator } from '../utils/users'
import { BREAKPOINTS } from '../theme' 
import Avatar from '../components/Avatar'

const StyledLobby = styled.div`
  margin: 0;
  padding: 0;
  background-image: url(${require('../assets/img/bg.jpg')});
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #1d1c1c;
  font-size: 25px;
  text-align: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

const StyledCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledUrl = styled.span`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  width: 45%;
  
  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
  }
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledCard = styled.div`
  margin: 30px;
  background-color: #ffffff;
  width: 30%;
  min-height: 500px;
  border-radius: 20px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
    margin: 10px;
  }
`

const StyledPlayers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledChar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`

const StyledSpan = styled.span`
  font-size: 12px;
`

const Lobby = ({ users, currentUser, session }) => {
  const url = get('location.href', window)
  const sessionCreator = isSessionCreator(session, currentUser.id)

  return (
    <StyledLobby>
    <Header />
    {session && currentUser && users ? (
      <>
      <StyledCode>
        Invite tes amis: <StyledUrl>{url}</StyledUrl>
      </StyledCode>

      <StyledContent>
        <Settings 
          isDisabled={size(users) <= 1 || !sessionCreator} 
          users={users} 
          session={session}
        />
        <StyledCard>
        <Typography variant="h5">Joueurs connectés</Typography>
          <StyledPlayers>
            {map(user => 
              <StyledChar key={get('id', user)}>
                <Avatar height={80} avatar={get('avatar',user)} margin="10px" />
                {get('name', user)}
                {get('id', currentUser) === get('id', user) && <StyledSpan>(Moi)</StyledSpan>}
            </StyledChar>  
            , users)}
          </StyledPlayers>
        </StyledCard>
      </StyledContent>
    </>
    ) : <div>Chargement...</div>
    }
  </StyledLobby>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, get('users', session)),
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(Lobby)