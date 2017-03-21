import {computed, observable} from 'mobx'

export default {
  @observable authorization: null,
  @computed get isLoggedIn () {
    return false
  }
}
