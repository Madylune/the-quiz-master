import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { getPath } from './routes'
import CreateSession from './screens/CreateSession'
import SessionSwitcher from './components/SessionSwitcher'
import Results from './screens/Results'
import { fetchUser } from './api/users/repository'

class App extends Component {
  componentDidMount = async () => {
    await fetchUser()
  }
  render() {
    return (
      <Switch>
        <Route 
          exact={true}
          path={getPath('home')}
          component={CreateSession}
        />
        <Route 
          exact={false}
          path={getPath('session', { code: ':code' })}
          component={SessionSwitcher}
        />
        <Route 
          exact={false}
          path={getPath('results', { code: ':code' })}
          component={Results}
        />
      </Switch>
    )
  }
}

export default App
