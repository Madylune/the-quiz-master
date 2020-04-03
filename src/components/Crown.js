import React from 'react'
import styled from 'styled-components'

const StyledImg = styled.img`
  height: ${props => props.height}px;
  margin: ${props => props.margin};
`

const Crown = ({ height, margin, className }) => 
  <StyledImg 
    className={className}
    alt="Couronne" 
    src={require(`../assets/img/crown.png`)}
    height={height}
    margin={margin}
  />

export default Crown