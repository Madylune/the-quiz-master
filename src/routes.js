export const getPath = (routeName, params = {}) => {
  switch (routeName) {
    case 'home':
      return '/'
    case 'session':
      return `/${params.code}`
    default:
      return routeName
  }
}

export default {}