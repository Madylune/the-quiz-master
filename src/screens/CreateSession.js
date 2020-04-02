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
` 

const StyledContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
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
`

const StyledTextField = styled(TextField)`
  && {
    width: 50%;
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
  img {
    height: 80px;
    margin: 10px;
  }
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
        <Typography variant="h5">
          Créé ton avatar
        </Typography>
          <StyledTextField id="outlined-basic" label="Ton nom" variant="outlined" onChange={onChangeName} />
          <StyledSlider>
            {map(char =>
              <StyledChar 
                key={char} 
                isSelected={avatar === char} 
                onClick={() => onSelectAvatar(char)}
              >
                <img src={require(`../assets/characters/${char}.png`)} alt="Personnage" />
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