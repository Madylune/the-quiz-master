import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const StyledHeader = styled.div`
  text-transform: uppercase;
  text-align: center;
  margin: 50px;
`

const StyledCrown = styled.img`
  height: 50px;
  margin: 0 5px;
`

const Header = () => 
  <StyledHeader>
    <Typography variant="h4">
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
      The Quiz Master
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
    </Typography>
  </StyledHeader>

export default Header