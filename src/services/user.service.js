import {action} from 'mobx'

export default class User {
  @action.bound rebuildSession () {
    this.store.token = window.localStorage.getItem('token')
    this.services.syncano.setToken(this.store.token)
  }

  @action.bound async login ({email}) {
    const {syncano} = this.services

    this.stores.pending.set('user.login')
    this.stores.messages.delete('user.login')

    try {
      const {token, code} = await syncano.post('auth/login', {email})

      this.emit('user.login.pending', {token, code, email})

      syncano.subscribe.once('auth/verify', {token}, this.handleValidLogin)
    } catch (err) {
      this.stores.messages.set('user.login', err.response.data.message)
    }

    this.stores.pending.delete('user.login')
  }

  handleValidLogin = ({
    payload: {user_key: key}
  }) => {
    this.store.token = key
    this.services.syncano.setToken(key)
    window.localStorage.setItem('token', key)
    this.emit('user.login.success', {token: key})
  }
}
