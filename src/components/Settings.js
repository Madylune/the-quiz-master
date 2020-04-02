import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Typography, Input, InputLabel, FormControl } from '@material-ui/core'

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

const Settings = ({ isDisabled }) => {
  const [ round, setRound ] = useState(2)
  const onRoundChange = e => setRound(e.target.value)

  const [ time, setTime ] = useState(5)
  const onTimeChange = e => setTime(e.target.value)
  return (
    <StyledSettings>
      <Typography variant="h5">Paramètres</Typography>
      <StyledFormControl>
        <InputLabel>Nombre de tours</InputLabel>
        <Input 
          type="number" 
          inputProps={{ min: "2", max: "10", step: "1" }}
          value={round} 
          onChange={onRoundChange}
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
      <Button color="primary" variant="contained" disabled={isDisabled}>
        Démarrer la partie
      </Button>
    </StyledSettings>
  )
}

export default Settings