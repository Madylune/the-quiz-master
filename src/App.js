import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { getPath } from './routes'
import Home from './screens/Home'
import Session from './screens/Session'
import Results from './screens/Results'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route 
          exact={true}
          path={getPath('home')}
          component={Home}
        />
        <Route 
          exact={false}
          path={getPath('session', { code: ':code' })}
          component={Session}
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
