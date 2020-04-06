import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import map from 'lodash/fp/map'
import get from 'lodash/fp/get'
import filter from 'lodash/fp/filter'
import isEmpty from 'lodash/fp/isEmpty'
import { Tooltip } from '@material-ui/core'
import { BREAKPOINTS } from '../../../theme'
import { updateUser } from '../../../api/users/repository'
import { updateSession } from '../../../api/sessions/repository'
import { getUsersByIds } from '../../../selectors/users'

const StyledCards = styled.div`
  position: absolute;
  z-index: 2;
  top: 20%;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    top: 10px;
    flex-direction: column;
    align-items: center;
  }
`

const StyledCard = styled.div`
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
  background-color: #bb4d5c;
  height: 200px;
  width: 150px;
  margin: 10px;
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.sm}) {
    height: 150px;
    width: 100px;
  }
`

const Cards = ({ cards, user, session, users }) => {

  const onCardClick = useCallback(
    async card => {
      const updatedCards = filter(c => c.id !== card.id, cards)
      await updateUser({
        ...user,
        cards: updatedCards,
        eliminated: isEmpty(updatedCards) ? true : undefined
      })
      const updatedUsers = filter(u => u.id !== user.id, users)
      await updateSession({
        session,
        users: isEmpty(updatedCards) ? updatedUsers : users,
        type: 'next_question'
      })
    }
  ,[cards, users, user, session])
  
  return (
    <StyledCards>
      {map(card =>
        <Tooltip 
          key={get('id',card)}
          title={`${get('title', card)}: ${get('description', card)}`}
        > 
          <StyledCard onClick={() => onCardClick(card)} />
        </Tooltip>
      , cards)}
    </StyledCards>
  )
}

const mapStateToProps = (state, { session }) => ({
  users: getUsersByIds(state, session.users)
})

export default connect(mapStateToProps)(Cards)