import { ENTITIES_UPDATE, ENTITIES_REMOVE } from '../actions/entities'
import get from 'lodash/get'
import omit from 'lodash/omit'

const entities = (state = {}, { type, payload }) => {
  switch (type) {
    case ENTITIES_UPDATE: {
      const newEntities = Object.entries(payload.entities).reduce(
        (memo, [entityName, entities]) => {
          return {
            ...memo,
            [entityName]: {
              ...get(state, [entityName], {}),
              ...Object.entries(entities).reduce(
                (mem, [id, entity]) => ({
                  ...mem,
                  [id]: entity
                }),
                {}
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
      return omit(state, payload.path)
    default:
      return state
  }
}

export default entities