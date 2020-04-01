import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import times from 'lodash/fp/times'
import map from 'lodash/fp/map'
import { createUser } from '../api/users/repository'
import { createSession } from '../api/sessions/repository'
import { getPath } from '../routes'

const StyledCreatePlayer = styled.div`
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
  overflow: scroll;
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

const StyledButton = styled(Button)`
`
 
const CreatePlayer = ({ history }) => {
  const [ selectedChar, setSelectedChar ] = useState(undefined)
  const onSelectChar = value => setSelectedChar(value)

  const [ name, setName ] = useState(undefined)
  const onChangeName = e => setName(e.target.value)

  const onCreateSession = async () => {
    const user = await createUser({
      name,
      avatar: selectedChar
    })
    if (user) {
      const session = await createSession()
      console.log('debug session', session)
      history.push(getPath('session', { code: session.code }))
    }
  }

  const characters = times(i => `Char-${i + 1}`, 12)
  return (
    <StyledCreatePlayer>
      <StyledTextField id="outlined-basic" label="Ton nom" variant="outlined" onChange={onChangeName} />
      <StyledSlider>
        {map(char =>
          <StyledChar 
            key={char} 
            isSelected={selectedChar === char} 
            onClick={() => onSelectChar(char)}
          >
            <img src={require(`../assets/characters/${char}.png`)} alt="Personnage" />
          </StyledChar>
        , characters)}
      </StyledSlider>
      <StyledButton color="primary" variant="contained" onClick={onCreateSession} disabled={!name || !selectedChar}>
        Créer une partie
      </StyledButton>
    </StyledCreatePlayer>
  )
}

export default withRouter(CreatePlayer)