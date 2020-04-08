import React,{ useEffect } from 'react'
import styled from 'styled-components'
import shuffle from 'lodash/fp/shuffle'

const StyledResults = styled.div`
  text-align: center;
  margin: 30px;
`

const GIFS = [
  'https://media.giphy.com/media/K3RxMSrERT8iI/giphy.gif',
  'https://media.giphy.com/media/uTuLngvL9p0Xe/giphy.gif',
  'https://media.giphy.com/media/cQNRp4QA8z7B6/giphy.gif',
  'https://media.giphy.com/media/4QFAH0qZ0LQnIwVYKT/giphy.gif',
  'https://media.giphy.com/media/xUPGcHretmclA1QgY8/giphy.gif',
  'https://media.giphy.com/media/l3q2Z6S6n38zjPswo/giphy.gif',
  'https://media.giphy.com/media/YknuLReuwWtY5FhLnN/giphy.gif'
]

const Results = () => {
  useEffect(() => {
    var sound = document.querySelector('.Audio')
    sound.play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledResults>
      <img src={shuffle(GIFS)} alt='gif' />
      <audio className="Audio"
        src={require(`../../../assets/sounds/applause.wav`)}>
      </audio>
    </StyledResults>
  )
}

export default Results