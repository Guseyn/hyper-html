
'use strict'

const { browserified, as } = require('@page-libs/cutie')
const { ResponseFromAjaxRequest, ResponseBody } = require('@page-libs/ajax')
const { CreatedOptions } = browserified(require('@cuties/object'))
const { ParsedJSON, StringifiedJSON } = browserified(require('@cuties/json'))
const AppliedActionsOnResponse = require('./../async/AppliedActionsOnResponse')
const EnabledElements = require('./../async/EnabledElements')
const ParsedElmSelectors = require('./../util/ParsedElmSelectors')
const FileInfo = require('./../util/FileInfo')
const E = require('./../E')

class EForm extends E {
  constructor () {
    super()
  }

  static get observedAttributes () {
    return [
      'data-request-url',
      'data-request-method',
      'data-request-headers',
      'data-request-button',
      'data-upload-progress-bar',
      'data-progress-bar',
      'data-response-object-name',
      'data-actions-on-response'
    ]
  }

  supportedActions () {
    return [
      'redirect',
      'saveToLocalStorage',
      'saveToMemoryStorage',
      'innerHTML',
      'addHTMLTo',
      'mapObjToElm',
      'hideElms',
      'showElms',
      'disableElms',
      'enableElms',
      'changeElmsClassName'
    ]
  }

  onRender () {
    const requestButton = new ParsedElmSelectors(
      this.getAttribute('data-request-button')
    ).value()[0]
    const uploadProgressBar = new ParsedElmSelectors(
      this.getAttribute('data-upload-progress-bar')
    ).value()[0]
    const progressBar = new ParsedElmSelectors(
      this.getAttribute('data-progress-bar')
    ).value()[0]
    this.tuneFileInputs(
      this.filteredFileInputs(
        this.getElementsByTagName('input')
      ), requestButton
    )
    if (requestButton) {
      requestButton.addEventListener('click', () => {
        requestButton.disabled = true
        const requestBody = this.requestBody()
        new ParsedJSON(
          new ResponseBody(
            new ResponseFromAjaxRequest(
              new CreatedOptions(
                'url', this.getAttribute('data-request-url'),
                'headers', new ParsedJSON(
                  this.getAttribute('data-request-headers') || '{}'
                ),
                'method', this.getAttribute('data-request-method') || 'POST',
                'uploadProgressEvent', this.showProgress(uploadProgressBar),
                'progressEvent', this.showProgress(progressBar)
              ),
              new StringifiedJSON(
                requestBody
              )
            )
          )
        ).as('RESPONSE').after(
          new EnabledElements([requestButton]).after(
            new AppliedActionsOnResponse(
              this.tagName,
              this.getAttribute('data-response-object-name'),
              this.getAttribute('data-actions-on-response'),
              this.supportedActions(),
              as('RESPONSE')
            )
          )
        ).call()
      })
    }
    this.prepareProgressBar(uploadProgressBar)
    this.prepareProgressBar(progressBar)
  }

  requestBody () {
    const inputs = this.getElementsByTagName('input')
    const selects = this.getElementsByTagName('select')
    const textareas = this.getElementsByTagName('textarea')
    const localStorageValues = this.getElementsByTagName('e-local-storage-value')
    const memoryStorageValues = this.getElementsByTagName('e-memory-storage-value')
    const requestBody = {}
    this.retrievedValuesFromInputsForRequestBody(inputs, requestBody)
    this.retrievedValuesFromSelectsForRequestBody(selects, requestBody)
    this.retrievedValuesFromTextareasForRequestBody(textareas, requestBody)
    this.retrievedValuesFromLocalStorageForRequestBody(localStorageValues, requestBody)
    this.retrievedValuesFromMemoryStorageForRequestBody(memoryStorageValues, requestBody)
    return requestBody
  }

  retrievedValuesFromInputsForRequestBody (inputs, requestBody) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index]
      if (!input.name) {
        throw new Error(`input ${input} has no name`)
      }
      if (input.type.toLowerCase() === 'radio') {
        if (input.checked) {
          requestBody[input.name] = input.value
        }
      } else if (input.type.toLowerCase() === 'checkbox') {
        requestBody[input.name] = input.checked
      } else if (input.type.toLowerCase() === 'file') {
        requestBody[input.name] = input.filesInfo
      } else {
        requestBody[input.name] = input.value
      }
    }
  }

  retrievedValuesFromSelectsForRequestBody (selects, requestBody) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index]
      if (!select.name) {
        throw new Error(`select ${select} has no name`)
      }
      requestBody[select.name] = select.value
    }
  }

  retrievedValuesFromTextareasForRequestBody (textareas, requestBody) {
    for (let index = 0; index < textareas.length; index++) {
      const textarea = textareas[index]
      if (!textarea.name) {
        throw new Error(`textarea ${textarea} has no name`)
      }
      requestBody[textarea.name] = textarea.value
    }
  }

  retrievedValuesFromLocalStorageForRequestBody (localStorageValues, requestBody) {
    for (let index = 0; index < localStorageValues.length; index++) {
      const localStorageValue = localStorageValues[index]
      if (!localStorageValue.name) {
        throw new Error(`localStorageValue ${localStorageValue} has no name`)
      }
      requestBody[localStorageValue.name] = localStorageValue.value()
    }
  }

  retrievedValuesFromMemoryStorageForRequestBody (memoryStorageValues, requestBody) {
    for (let index = 0; index < memoryStorageValues.length; index++) {
      const memoryStorageValue = memoryStorageValues[index]
      if (!memoryStorageValue.name) {
        throw new Error(`memoryStorageValue ${memoryStorageValue} has no name`)
      }
      requestBody[memoryStorageValue.name] = memoryStorageValue.value()
    }
  }

  tuneFileInputs (fileInputs, requestButton) {
    for (let index = 0; index < fileInputs.length; index++) {
      this.tuneFileInput(fileInputs[index], requestButton)
    }
  }

  tuneFileInput (fileInput, requestButton) {
    const readProgressBar = new ParsedElmSelectors(
      fileInput.getAttribute('data-read-progress-bar')
    ).value()[0]
    this.prepareProgressBar(readProgressBar)
    fileInput.addEventListener('change', () => {
      this.readFilesContentForRequestBody(fileInput, requestButton, readProgressBar)
    })
  }

  readFilesContentForRequestBody (fileInput, requestButton, readProgressBar) {
    fileInput.filesInfo = []
    for (let index = 0; index < fileInput.files.length; index++) {
      this.readFileContentForRequestBody(fileInput, requestButton, readProgressBar, index)
    }
  }

  readFileContentForRequestBody (fileInput, requestButton, readProgressBar, index) {
    const file = fileInput.files[index]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadstart = () => {
      if (requestButton) {
        requestButton.setAttribute('disabled', true)
      }
    }
    reader.onload = () => {
      fileInput.filesInfo[index] = new FileInfo(
        file.name,
        file.size,
        file.type,
        reader.result,
        file.lastModifiedDate
      )
      if (requestButton) {
        requestButton.removeAttribute('disabled')
      }
    }
    reader.onabort = () => {
      if (requestButton) {
        requestButton.removeAttribute('disabled')
      }
    }
    reader.onprogress = this.showProgress(readProgressBar)
    reader.onloadend = this.hideProgress(readProgressBar)
    reader.onerror = function () {
      throw new Error(`cound not read file ${file.name}`)
    }
  }

  filteredFileInputs (inputs) {
    const fileInputs = {
      length: 0
    }
    for (let index = 0; index < inputs.length; index++) {
      if (inputs[index].type.toLowerCase() === 'file') {
        fileInputs[fileInputs.length] = inputs[index]
        fileInputs.length += 1
      }
    }
    return fileInputs
  }

  prepareProgressBar (progressBar) {
    if (progressBar) {
      progressBar.max = 100
      progressBar.value = 0
      progressBar.style.display = 'none'
    }
  }

  showProgress (progressBar) {
    if (progressBar) {
      return (event) => {
        if (event.lengthComputable) {
          progressBar.style.display = ''
          const percentComplete = parseInt((event.loaded / event.total) * 100)
          progressBar.value = percentComplete
        }
      }
    }
    return () => {}
  }

  hideProgress (progressBar) {
    if (progressBar) {
      return () => {
        progressBar.style.display = 'none'
      }
    }
    return () => {}
  }
}

window.customElements.define('e-form', EForm)

module.exports = EForm