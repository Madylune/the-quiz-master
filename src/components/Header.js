import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { BREAKPOINTS } from '../theme' 
import Crown from './Crown'

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

const StyledCrown = styled(Crown)`
  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 30px;
  }
`

const Header = () => 
  <StyledHeader>
    <StyledTitle variant="h4">
      <StyledCrown margin="0 5px" height={50} />
      The Quiz Master
      <StyledCrown margin="0 5px" height={50} />
    </StyledTitle>
  </StyledHeader>

export default Header