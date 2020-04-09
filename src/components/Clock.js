import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CLOCK_SET_TIME_OVER } from '../actions/clock'

const StyledClock = styled.div`
  color: #ffffff;
  font-size: 25px;
  text-align: center;
`

const Clock = ({ delay, endTime }) => {
  const [ counter, setCounter ] = useState(delay)
  const dispatch = useDispatch()

  useEffect(() => {
    var sound = document.querySelector('.Audio')
    if (endTime) {
      if (Date.now() < endTime && counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000)
        sound.play()
        dispatch({ 
          type: CLOCK_SET_TIME_OVER,
          payload: { timeOver: false }
        })
      } else {
        sound.pause()
        setCounter(0)
        dispatch({ 
          type: CLOCK_SET_TIME_OVER,
          payload: { timeOver: true }
        })
      }
    }
  }, [counter, dispatch, endTime])

  return (
  <StyledClock>
    {counter}s
    <audio className="Audio"
      src={require('../assets/sounds/clock.ogg')}>
    </audio>
  </StyledClock>
  )
}

export default Clock