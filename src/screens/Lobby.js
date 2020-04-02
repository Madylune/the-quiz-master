import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import size from 'lodash/fp/size'
import Header from '../components/Header'
import { getUsersByIds } from '../selectors/users'

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
  width: 30%;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
`

const StyledCard = styled.div`
  margin: 30px;
  background-color: #ffffff;
  width: 30%;
  min-height: 500px;
`

const StyledChar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  img {
    height: 80px;
    margin: 10px;
  }
`

const Lobby = ({ users }) => {
  const url = get('location.href', window)
  return (
    <StyledLobby>
    <Header />
    <StyledCode>
      Invite tes amis: <StyledUrl>{url}</StyledUrl>
    </StyledCode>

    <StyledContent>
      <StyledCard>
        Paramètres <br/>
        <Button color="primary" variant="contained" disabled={size(users) <= 1}>
          Démarrer la partie
        </Button>
      </StyledCard>

      <StyledCard>
        Joueurs connectés: <br/>
        {map(user => 
          <StyledChar key={get('id', user)}>
            <img src={require(`../assets/characters/${get('avatar', user)}.png`)} alt="Personnage" />
            {get('name', user)}
        </StyledChar>  
        , users)}
      </StyledCard>
    </StyledContent>
  </StyledLobby>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, get('users', session))
})

export default connect(mapStateToProps)(Lobby)