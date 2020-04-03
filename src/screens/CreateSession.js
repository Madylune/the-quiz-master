import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { TextField, Button, Typography } from '@material-ui/core'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import { createSession } from '../api/sessions/repository'
import { getPath } from '../routes'
import Header from '../components/Header'
import Rules from '../components/Rules'
import { BREAKPOINTS } from '../theme' 
import Avatar from '../components/Avatar'

const StyledCreateSession = styled.div`
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
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledCard = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  height: 350px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 300px;
    width: 90%;
  }
`

const StyledTitle = styled(Typography)`
    && {
    @media (max-width: ${BREAKPOINTS.sm}) {
      font-size: 18px;
    }
  }
`

const StyledTextField = styled(TextField)`
  && {
    width: 50%;
    @media (max-width: ${BREAKPOINTS.sm}) {
      width: 70%;
    }
  }
`

const StyledSlider = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 300px;
`

const StyledChar = styled.div`
  cursor: pointer;
  border: ${(props => props.isSelected ? '2px solid #9edbff': undefined)};
  border-radius: 20px;
`

const CreateSession = ({ history }) => {
  const [ avatar, setAvatar ] = useState(undefined)
  const onSelectAvatar = value => setAvatar(value)

  const [ name, setName ] = useState(undefined)
  const onChangeName = e => setName(e.target.value)

  const onCreateSession = async () => {
    if (!!name && !!avatar ) {
      const session = await createSession({
        name,
        avatar
      })
      history.push(getPath('session', { code: session.code }))
    }
  }

  const characters = times(i => `Char-${i + 1}`, 12)
  return (
    <StyledCreateSession>
      <Header />
      <StyledContent>
        <StyledCard>
        <StyledTitle variant="h5">
          Créé ton avatar
        </StyledTitle>
          <StyledTextField id="outlined-basic" label="Ton nom" variant="outlined" onChange={onChangeName} />
          <StyledSlider>
            {map(char =>
              <StyledChar 
                key={char} 
                isSelected={avatar === char} 
                onClick={() => onSelectAvatar(char)}
              >
                <Avatar height={80} avatar={char} margin="10px" />
              </StyledChar>
            , characters)}
          </StyledSlider>
          <Button color="primary" variant="contained" onClick={onCreateSession} disabled={!name || !avatar}>
            Créer une partie
          </Button>
        </StyledCard>
        <Rules />
      </StyledContent>
    </StyledCreateSession>
  )
}

export default withRouter(CreateSession)