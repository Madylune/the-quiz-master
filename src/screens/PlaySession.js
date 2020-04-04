import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import concat from 'lodash/fp/concat'
import { getUsersObject, getCurrentUser } from '../selectors/users'
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

const StyledRounds = styled.div`
  font-weight: bold;
  margin: 10px;
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

class PlaySession extends Component {
  render() {
    const { session, users, currentUser } = this.props
    const quizMaster = find(user => user.id === get('quizMaster', session), users)
    const isQuizMaster = get('id', currentUser) === get('id', quizMaster)
    const players = concat(quizMaster, get('players', session))

    return (
      <StyledPlaySession>
        <StyledContent>
          <StyledUsers>
            <StyledRounds>
              Round: {get('currentRound', session)} / {get('rounds', session)}
            </StyledRounds>
            {!!players && !!quizMaster && map(player =>
              <StyledUser key={get('id', player)}>
                <Avatar height={45} avatar={get('avatar', player)} />
                <span className="Username">{get('name', player)}</span>
                {get('id', player) === get('id', quizMaster) && (
                  <Crown height={20} />
                )}
                <StyledCards>
                  <Card />
                  <Card />
                  <Card />
                </StyledCards>
              </StyledUser>
            , players)}
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
}

const mapStateToProps = state => ({
  users: getUsersObject(state),
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(PlaySession)