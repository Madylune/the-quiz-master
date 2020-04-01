import { ENTITIES_UPDATE, ENTITIES_REMOVE } from './actions'
import getOr from 'lodash/fp/getOr'
import omit from 'lodash/fp/omit'

const entities = (state = {}, { type, payload }) => {
  switch (type) {
    case ENTITIES_UPDATE: {
      const newEntities = Object.entries(payload.entities).reduce(
        (memo, [entityName, entities]) => {
          return {
            ...memo,
            [entityName]: {
              ...getOr({}, [entityName], state),
              ...Object.entries(entities).reduce(
                (mem, [id, entity]) => ({
                  ...mem,
                  [id]: entity
                })
              )
            }
          }
        },
        {}
      )
      return {
        ...state,
        ...newEntities
      }
    }

    case ENTITIES_REMOVE:
      return omit(payload.path, state)
    default:
      return state
  }
}

export default entities