export const ENTITIES_UPDATE = 'entities.update'
export const updateEntities = entities => ({
  type: ENTITIES_UPDATE,
  payload: { entities }
})

export const ENTITIES_REMOVE = 'entities.remove'
export const removeEntity = path => ({
  type: ENTITIES_REMOVE,
  payload: { path }
})