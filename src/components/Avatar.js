import React from 'react'
import styled from 'styled-components'

const StyledImg = styled.img`
  height: ${props => props.height}px;
  margin: ${props => props.margin};
`

const Avatar = ({ height, avatar, margin, className }) =>
  <StyledImg 
    className={className}
    alt="Avatar" 
    src={require(`../assets/characters/${avatar}.png`)}
    height={height}
    margin={margin}
  />

export default Avatar