import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import { joinSession } from '../api/sessions/repository'
import Header from '../components/Header'

const StyledJoinSession = styled.div`
  margin: 0;
  padding: 0;
  background-color: #9edbff;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
` 

const StyledCard = styled.div`
  margin: auto;
  background-color: #ffffff;
  height: 300px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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

const JoinSession = ({ session }) => {
  const [ avatar, setAvatar ] = useState(undefined)
  const onSelectAvatar = value => setAvatar(value)

  const [ name, setName ] = useState(undefined)
  const onChangeName = e => setName(e.target.value)

  const onJoinSession = async () => {
    if (name && avatar ) {
      await joinSession({
        user: {
          name,
          avatar
        },
        id: session.id
      })
    }
  }

  const characters = times(i => `Char-${i + 1}`, 12)
  return (
    <StyledJoinSession>
      <Header />
      <StyledCard>
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
        <Button color="primary" variant="contained" onClick={onJoinSession} disabled={!name || !avatar}>
          Rejoindre la partie
        </Button>
      </StyledCard>
    </StyledJoinSession>
  )
}

export default withRouter(JoinSession)