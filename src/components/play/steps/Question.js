import React, { useEffect } from 'react'
import styled from 'styled-components'
import map from 'lodash/fp/map'
import get from 'lodash/fp/get'
import { updateSession } from '../../../api/sessions/repository'
import { sampleQuestions } from '../../../utils/questions'

const StyledQuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
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

const Question = ({ session, isQuizMaster }) => {
  const questions = sampleQuestions()
  
  const onSelectQuestion = async question => {
    await updateSession({
      id: session.id,
      questionTitle: question,
      playerTurn: get(['players', 0, 'id'], session),
      type: 'create_question'
    })
  }

  useEffect(() => {
    var sound = document.querySelector('.Audio')
    isQuizMaster && sound.play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledQuestion>
      {map(question => 
        <StyledQuestionCard key={question} onClick={() => onSelectQuestion(question)}>
          {question}
        </StyledQuestionCard>
      , questions)}
      <audio className="Audio"
        src={require(`../../../assets/sounds/your_turn.mp3`)}>
      </audio>
    </StyledQuestion>
  )
}

export default Question