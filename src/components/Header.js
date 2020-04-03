import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { BREAKPOINTS } from '../theme' 

const StyledHeader = styled.div`
  text-transform: uppercase;
  text-align: center;
  margin: 50px;
  @media (max-width: ${BREAKPOINTS.sm}) {
    margin: 30px;
  }
`

const StyledTitle = styled(Typography)`
  && {
    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 22px;
    }
  }
`

const StyledCrown = styled.img`
  height: 50px;
  margin: 0 5px;
  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 30px;
  }
`

const Header = () => 
  <StyledHeader>
    <StyledTitle variant="h4">
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
      The Quiz Master
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
    </StyledTitle>
  </StyledHeader>

export default Header