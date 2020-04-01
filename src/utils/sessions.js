import random from 'lodash/random'
import padStart from 'lodash/padStart'

export const generateCode = () => padStart(random(0, 9999), 4, '0')