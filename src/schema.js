import {
  schema,
  normalize as normalizer,
  denormalize as denormalizer
} from 'normalizr'

const user = new schema.Entity('users')
const userValues = new schema.Array(user)
const session = new schema.Entity(
  'sessions',
  {},
  {
    processStrategy: entity => ({
      ...entity
    })
  }
)
const question = new schema.Entity('questions')
const questionValues = new schema.Array(question)
const answer = new schema.Entity('answers')
const answerValues = new schema.Array(answer)

question.define({
  answers: answerValues,
})

session.define({
  questions: questionValues,
  users: userValues
})

const fullSchema = {
  user,
  session,
  question,
  answer
}

export const normalize = data => normalizer(data, fullSchema)

export const denormalize = (data, entities) => denormalizer(data, fullSchema, entities)

export default schema