import {computed, observable} from 'mobx'

export default {
  @observable token: null,
  @computed get isLoggedIn () {
    return Boolean(this.token)
  }
}
