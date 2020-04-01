import { createSelector } from 'reselect'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import flow from 'lodash/fp/flow'
import compact from 'lodash/fp/compact'
import includes from 'lodash/fp/includes'
import values from 'lodash/fp/values'
import pickBy from 'lodash/pickBy'

export const getEntityById = (state, entitiesName, entityId) => get(['entities', entitiesName, entityId], state)

export const getEntitiesObject = (state, entitiesName) => getOr({}, ['entities', entitiesName], state)

export const getEntities = createSelector(
  [getEntitiesObject],
  entities => flow(
    values,
    compact
  )(entities)
)

export const getEntitiesObjectByIds = createSelector(
  [getEntitiesObject, (...args) => args[2]],
  (entities, ids) => pickBy(entities, ({ id }) => includes(id, ids))
)

export const getEntitiesByIds = createSelector(
  [getEntitiesObjectByIds],
  entities => flow(
    values,
    compact
  )(entities)
)