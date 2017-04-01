import {Match, MatchAsGuest, MatchAsMember, Switch} from './components/router'

import DashboardView from './views/dashboard'
import LoginView from './views/login'
import MissingView from './views/missing'

function Routes () {
  return (
    <Switch>
      <MatchAsGuest path='/' exact component={LoginView} redirect='/dashboard' />
      <MatchAsMember path='/dashboard' exact component={DashboardView} redirect='/' />
      <Match component={MissingView} />
    </Switch>
  )
}

Routes.init = ({services}) => {
  services.user.rebuildSession()
}

export default Routes
