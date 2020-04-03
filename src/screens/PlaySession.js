import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import { getUsersByIds, getCurrentUser } from '../selectors/users'
import Desk from '../components/play/Desk'
import Avatar from '../components/Avatar'
import Crown from '../components/Crown'
import Card from '../components/Card'

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
`

const StyledUsers = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 20%;
  height: 100vh;
  margin: 10px;
`

const StyledUser = styled.div`
  margin: 10px 5px;
  .Username{
    margin: 5px;
    font-size: 18px;
  }
`

const StyledCards = styled.div`
  display: flex;
`

const PlaySession = ({ session, users, currentUser }) => {
  const quizMaster = find(user => user.id === get('currentQuizMaster', session), users)
  const isQuizMaster = currentUser.id === quizMaster.id
  return (
    <StyledPlaySession>
      <StyledContent>
        <StyledUsers>
          {map(user =>
            <StyledUser>
              <Avatar height={45} avatar={get('avatar', user)} />
              <span className="Username">{get('name', user)}</span>
              {user.id === quizMaster.id && (
                <Crown height={20} />
              )}
              <StyledCards>
                <Card />
                <Card />
                <Card />
              </StyledCards>
            </StyledUser>
          , users)}
        </StyledUsers>

        <Desk 
          isQuizMaster={isQuizMaster}
          quizMaster={quizMaster}
          session={session}
        />
      </StyledContent>
    </StyledPlaySession>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, get('users', session)),
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(PlaySession)