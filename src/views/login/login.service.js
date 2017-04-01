import {when} from 'zefir/utils'

export default class LoginView {
  @when('user.login.pending')
  saveAuthenticationData (data) {
    this.store.authorization = data
  }
}
