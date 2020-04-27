import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Header from '../components/Header'
import { BREAKPOINTS } from '../theme' 

const StyledUnfoundSession = styled.div`
  margin: 0;
  padding: 0;
  background-image: url(${require('../assets/img/bg.jpg')});
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  overflow-y: scroll;
` 

const StyledContent = styled.div`
  margin: 10px auto;
  padding: 10px;
  background-color: #ffffff;
  height: 200px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  text-align: center;
  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 90%;
  }
`

const UnfoundSession = () => {
  return (
    <StyledUnfoundSession>
      <Header />
      <StyledContent>
        <Typography variant="h5">Cette session n'existe pas !<br/> 
          Vérifie l'url que t'a envoyé ton ami.
        </Typography>
      </StyledContent>
    </StyledUnfoundSession>
  )
}

export default UnfoundSession