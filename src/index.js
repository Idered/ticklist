import {Match, MatchAsGuest, Switch} from './components/router'

import LoginView from './views/login'
import MissingView from './views/missing'

export default () => (
  <Switch>
    <MatchAsGuest path='/' exact component={LoginView} />
    <Match component={MissingView} />
  </Switch>
)
