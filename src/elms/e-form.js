'use strict'

const HTMLTunedElement = require('./../objects/HTMLTunedElement')

class EForm extends HTMLTunedElement {
  constructor () {
    super()
  }

  static get observedAttributes () {
    return ['data-request-url', 'data-request-headers', 'data-request-button']
  }

  render () {
    const form = this // .replacedWith(document.createElement('form'))
    const inputs = form.getElementsByTagName('input')
    const fieldsets = form.getElementsByTagName('fieldset')
    // const selects = form.getElementsByTagName('select')
    // const textareas = form.getElementsByTagName('textarea')
    // const localStorageValues = form.getElementsByTagName('e-local-storage-value')
    // const memoryStorageValues = form.getElementsByTagName('e-memory-storage-value')
    const requestButton = document.getElementById(form.getAttribute('data-request-button').split('#')[1])
    requestButton.addEventListener('click', () => {
      const requestBody = { }
      this.retrievedValuesFromElmsForRequestBody(fieldsets, requestBody)
      this.retrievedValuesFromElmsForRequestBody(inputs, requestBody)
    })
  }

  retrievedValuesFromElmsForRequestBody (elms, requestBody) {
    console.log(requestBody)
    Object.keys(elms).forEach(index => {
      console.log(elms[index].value)
    })
  }
}

module.exports = EForm
