import React from 'react'
import styled from 'styled-components'
import { Tooltip } from '@material-ui/core'
import get from 'lodash/fp/get'

const StyledCard = styled.div`
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
  background-color: #bb4d5c;
  height: 30px;
  width: 20px;
  margin: 1px;
`

const Card = ({ card, isCurrentUser }) => 
  isCurrentUser ? (
    <Tooltip title={`${get('title', card)}: ${get('description', card)}`}>
      <StyledCard />
    </Tooltip>
  ) : <StyledCard />

export default Card