import React from 'react'
import styled from 'styled-components'
import { Tooltip } from '@material-ui/core'
import get from 'lodash/fp/get'

const StyledCard = styled.div`
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
  background-color: ${props => props.isCurrentUser ? '#ffffff' : '#bb4d5c'};
  height: 30px;
  width: 20px;
  margin: 2px;
  display: flex;
  align-items: center;
`

const StyledPicto = styled.img`
  width: 100%;
`

const Card = ({ card, isCurrentUser }) => 
  isCurrentUser ? (
    <Tooltip title={`${get('title', card)}: ${get('description', card)}`}>
      <StyledCard isCurrentUser={isCurrentUser}>
        {get('picture', card) ? <StyledPicto src={require(`../assets/picto/${get('picture', card)}.png`)} /> : null}
      </StyledCard>
    </Tooltip>
  ) : <StyledCard />

export default Card