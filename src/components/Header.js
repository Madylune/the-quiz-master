import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  font-size: 30px;
  font-weight: 900;
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
    <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
    The Quiz Master
    <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
  </StyledHeader>

export default Header