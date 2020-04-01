import React from 'react'
import styled from 'styled-components'
import CreateSession from '../components/CreateSession'

const StyledHome = styled.div`
  margin: 0;
  padding: 0;
  background-color: #9edbff;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const StyledTitle = styled.div`
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

const Home = () => 
  <StyledHome>
    <StyledTitle>
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
      The Quiz Master
      <StyledCrown src={require('../assets/img/crown.png')} alt="Couronne" />
    </StyledTitle>
    <CreateSession />
  </StyledHome>

export default Home