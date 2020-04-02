import pickBy from 'lodash/pickBy'
import negate from 'lodash/negate'
import isUndefined from 'lodash/isUndefined'

const cleanSpec = entity => pickBy(entity, negate(isUndefined))

export default cleanSpec