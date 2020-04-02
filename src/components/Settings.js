import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Typography, Input, InputLabel, FormControl } from '@material-ui/core'
import { startSession } from '../api/sessions/repository'

const StyledSettings = styled.div`
  margin: 30px;
  background-color: #ffffff;
  width: 30%;
  height: 300px;
  border-radius: 20px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StyledFormControl = styled(FormControl)`
  && {
    width: 70%;
  }
`

const Settings = ({ isDisabled, session, users }) => {
  const [ rounds, setRounds ] = useState(2)
  const onRoundsChange = e => setRounds(e.target.value)

  const [ time, setTime ] = useState(5)
  const onTimeChange = e => setTime(e.target.value)

  const onStartGame = async () => {
    await startSession({ 
      id: session.id,
      rounds,
      users
    })
  }

  return (
    <StyledSettings>
      <Typography variant="h5">Paramètres</Typography>
      <StyledFormControl>
        <InputLabel>Nombre de tours</InputLabel>
        <Input 
          type="number" 
          inputProps={{ min: "2", max: "10", step: "1" }}
          value={rounds} 
          onChange={onRoundsChange}
          disabled={isDisabled}
        />
      </StyledFormControl>
      <StyledFormControl>
        <InputLabel>Temps de réponse (en secondes)</InputLabel>
        <Input 
          type="number" 
          inputProps={{ min: "5", max: "20", step: "1" }}
          value={time} 
          onChange={onTimeChange}
          disabled={isDisabled}
        />
      </StyledFormControl>
      <Button 
        color="primary" 
        variant="contained" 
        disabled={isDisabled}
        onClick={onStartGame}
      >
        Démarrer la partie
      </Button>
    </StyledSettings>
  )
}

export default Settings