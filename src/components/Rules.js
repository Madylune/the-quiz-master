import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { BREAKPOINTS } from '../theme' 

const StyledRules = styled.div`
  margin: 10px;
  padding: 10px 50px;
  background-color: #ffffff;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    margin: 0;
    padding: 10px;
    width: 90%;
  }
`

const StyledTypography = styled(Typography)`
  && {
    margin: 5px; 
  }
`

const Rules = () =>
  <StyledRules>
    <StyledTypography variant="h5">
      Règles du jeu
    </StyledTypography>
    <StyledTypography variant="body1">
      Pour gagner, tu dois te débarrasser de tous les autres joueurs ! 
    </StyledTypography>
    <StyledTypography variant="body1">
      A chaque tour, un maître de jeu est désigné, c'est le "Quiz Master". Son rôle est de 
      choisir une question parmi une liste de 3 questions à laquelle les autres joueurs doivent
      répondre dans un temps imparti. Le "Quiz Master" devra ensuite voter si la réponse est valide ou non.
      A lui de rester fair-play.
    </StyledTypography>
    <StyledTypography variant="body1">
      Au début de la partie, chaque joueur dispose de 3 cartes. Il peut en gagner une à chaque tour remporté.
      Chaque carte possède un pouvoir spécial qui peut désavantager ses adversaires. Une carte ne peut être jouée
      qu'au début d'un tour.
    </StyledTypography>
    <StyledTypography variant="body1">
      Lorsqu'un joueur perd un tour, il doit remettre une de ses cartes au "Quiz Master". Si un joueur n'a plus
      aucune carte en sa possession, il est éliminé de la partie.
    </StyledTypography>
    <StyledTypography variant="body1">
      Dois-je garder toutes mes cartes ou bien les jouer pour mettre en difficulté mes adversaires ? A toi de faire
      le bon choix !
    </StyledTypography>
  </StyledRules>

export default Rules