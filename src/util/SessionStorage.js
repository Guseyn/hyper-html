'use strict'

class SessionStorage {
  constructor () {
  }

  getItem (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (error) {
      return sessionStorage.getItem(key)
    }
  }

  setItem (key, value) {
    if (value instanceof Object) {
      sessionStorage.setItem(
        key,
        JSON.stringify(value)
      )
    } else {
      sessionStorage.setItem(value)
    }
  }
}

window.sessionStorageWrapper = new SessionStorage()

module.exports = SessionStorage
