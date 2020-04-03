import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
  background-color: #bb4d5c;
  height: 30px;
  width: 20px;
  margin: 1px;
`

const Card = () => <StyledCard />

export default Card