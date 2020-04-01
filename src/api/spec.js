import pickBy from 'lodash/fp/pickBy'
import negate from 'lodash/fp/negate'
import isUndefined from 'lodash/fp/isUndefined'

const cleanSpec = entity => pickBy(negate(isUndefined), entity)

export default cleanSpec