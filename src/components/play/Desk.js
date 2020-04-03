import React from 'react'
import styled from 'styled-components'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import { Typography } from '@material-ui/core'
import Avatar from '../Avatar'

const StyledQuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: #e4eeeb;
  }
`

const StyledQuestion = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
`

const StyledDesk = styled.div`
  position: relative;
  background-color: rgba(0,0,0,0.8);
  border-radius: 10px;
  width: 80%;
  height: 100vh;
  margin: 10px;
`

const StyledInstruction = styled.div`
  margin: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Desk = ({ quizMaster, isQuizMaster, session }) => {
  return (
    <StyledDesk>
      <StyledInstruction>
        <Avatar height={60} avatar={get('avatar', quizMaster)} margin="5px 10px" />
        <Typography variant="h6">
          {get('name', quizMaster)} est en train de choisir une question
        </Typography>
      </StyledInstruction>
      {isQuizMaster && (
        <StyledQuestion>
          {map(question => 
            <StyledQuestionCard key={question}>{question}</StyledQuestionCard>
          ,get('questions', session))}
        </StyledQuestion>
      )}
    </StyledDesk>
  )
}

export default Desk