export const getPath = (routeName, params = {}) => {
  switch (routeName) {
    case 'home':
      return '/'
    case 'session':
      return `/${params.code}`
    case 'results':
      return `/${params.code}/results`
    default:
      return routeName
  }
}

export default {}