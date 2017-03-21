import {action} from 'mobx'

export default class User {
  @action login = async ({email}) => {
    this.stores.pending.set('user.login')
    this.stores.messages.delete('user.login')

    try {
      const {token, code} = await this.syncano.post('auth/login', {email})

      // TODO: Run listener to verify login confirmation

      this.store.authorization = {token, code, email}
    } catch (e) {
      this.stores.messages.set('user.login', e.response.data.message)
    }

    this.stores.pending.delete('user.login')
  }
}
