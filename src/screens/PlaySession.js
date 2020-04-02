import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import { getUsersByIds, getCurrentUser } from '../selectors/users'
import { Typography } from '@material-ui/core'

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

const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  margin: 20px;
  height: 50px;
  width: 300px;
  margin: 10px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #e4eeeb;
  }
`

const PlaySession = ({ session, users, currentUser }) => {
  const quizMaster = find(user => user.id === get('currentQuizMaster', session), users)
  return (
    <StyledPlaySession>
      <Typography variant="h4">
        Le Quiz Master pour ce tour est: {get('name', quizMaster)}
      </Typography>
      {currentUser.id === quizMaster.id ? (
        <>
        <Typography variant="body1">
          {get('name', quizMaster)}, choisis une question:
        </Typography>
        {map(question => 
          <QuestionCard key={question}>{question}</QuestionCard>
        ,get('questions', session))}
        </>
      ) : (
      <Typography variant="body1">
        Le Quiz Master est en train de choisir une question
      </Typography>
      )}
    </StyledPlaySession>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, get('users', session)),
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(PlaySession)