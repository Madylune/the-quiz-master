import {
  schema,
  normalize as normalizer,
  denormalize as denormalizer
} from 'normalizr'

const user = new schema.Entity('users')
const userValues = new schema.Array(user)

const question = new schema.Entity(
  'questions',
  {},
  {
    processStrategy: entity => ({
      ...entity
    })
  }
)
const questionValues = new schema.Array(question)

const card = new schema.Entity(
  'cards',
  {},
  {
    processStrategy: entity => ({
      ...entity
    })
  }
)
const cardValues = new schema.Array(card)

const session = new schema.Entity(
  'sessions',
  {},
  {
    processStrategy: entity => ({
      ...entity
    })
  }
)

session.define({
  questions: questionValues,
  cards: cardValues,
  users: userValues
})

const fullSchema = {
  user,
  question,
  card,
  session
}

export const normalize = data => normalizer(data, fullSchema)

export const denormalize = (data, entities) => denormalizer(data, fullSchema, entities)

export default schema