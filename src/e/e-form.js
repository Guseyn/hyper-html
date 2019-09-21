
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
    return [ ]
  }

  onRender () {
    this.inputs = this.getElementsByTagName('input')
    this.selects = this.getElementsByTagName('select')
    this.textareas = this.getElementsByTagName('textarea')
    this.localStorageValues = this.getElementsByTagName('e-local-storage-value')
    this.sessionStorageValues = this.getElementsByTagName('e-session-storage-value')
    this.buttons = this.getElementsByTagName('button')
    this.progressBars = this.getElementsByTagName('progress')
    this.tuneFileInputs(this.filteredFileInputs(this.inputs))
    this.propagateFormSendEvent(this.inputs)
    this.propagateFormSendEvent(this.selects)
    this.propagateFormSendEvent(this.textareas)
    this.propagateFormSendEvent(this.localStorageValues)
    this.propagateFormSendEvent(this.sessionStorageValues)
    this.propagateFormSendEvent(this.buttons)
    this.prepareProgressBars(this.progressBars)
  }

  propagateFormSendEvent (elms) {
    for (let index = 0; index < elms.length; index++) {
      const elm = elms[index]
      const eventName = elm.getAttribute('data-send-form-on')
      if (eventName) {
        elm.addEventListener(eventName, () => {
          this.submit(elm)
        })
      }
    }
  }

  submit (target) {
    const uploadProgressBar = new ParsedElmSelectors(
      target.getAttribute('data-upload-progress-bar')
    ).value()[0]
    const progressBar = new ParsedElmSelectors(
      target.getAttribute('data-progress-bar')
    ).value()[0]
    target.disabled = true
    const requestBody = this.requestBody()
    new ParsedJSON(
      new ResponseBody(
        new ResponseFromAjaxRequest(
          new CreatedOptions(
            'url', target.getAttribute('data-request-url'),
            'headers', new ParsedJSON(
              target.getAttribute('data-request-headers') || '{}'
            ),
            'method', target.getAttribute('data-request-method') || 'POST',
            'uploadProgressEvent', this.showProgress(uploadProgressBar),
            'progressEvent', this.showProgress(progressBar)
          ),
          new StringifiedJSON(
            requestBody
          )
        )
      )
    ).as('RESPONSE').after(
      new EnabledElements([target]).after(
        new AppliedActionsOnResponse(
          target.tagName,
          target.getAttribute('data-response-object-name'),
          target.getAttribute('data-actions-on-response'),
          as('RESPONSE')
        )
      )
    ).call()
  }

  requestBody () {
    const requestBody = {}
    this.retrievedValuesFromInputsForRequestBody(this.inputs, requestBody)
    this.retrievedValuesFromSelectsForRequestBody(this.selects, requestBody)
    this.retrievedValuesFromTextareasForRequestBody(this.textareas, requestBody)
    this.retrievedValuesFromLocalStorageForRequestBody(this.localStorageValues, requestBody)
    this.retrievedValuesFromSessionStorageForRequestBody(this.sessionStorageValues, requestBody)
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

  retrievedValuesFromSessionStorageForRequestBody (sessionStorageValues, requestBody) {
    for (let index = 0; index < sessionStorageValues.length; index++) {
      const sessionStorageValue = sessionStorageValues[index]
      if (!sessionStorageValue.name) {
        throw new Error(`sessionStorageValue ${sessionStorageValue} has no name`)
      }
      requestBody[sessionStorageValue.name] = sessionStorageValue.value()
    }
  }

  tuneFileInputs (fileInputs) {
    for (let index = 0; index < fileInputs.length; index++) {
      this.tuneFileInput(fileInputs[index])
    }
  }

  tuneFileInput (fileInput) {
    const readProgressBar = new ParsedElmSelectors(
      fileInput.getAttribute('data-read-progress-bar')
    ).value()[0]
    fileInput.addEventListener('change', () => {
      this.readFilesContentForRequestBody(fileInput, readProgressBar)
    })
  }

  readFilesContentForRequestBody (fileInput, readProgressBar) {
    fileInput.filesInfo = []
    for (let index = 0; index < fileInput.files.length; index++) {
      this.readFileContentForRequestBody(fileInput, readProgressBar, index)
    }
  }

  readFileContentForRequestBody (fileInput, readProgressBar, index) {
    const file = fileInput.files[index]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileInput.filesInfo[index] = new FileInfo(
        file.name,
        file.size,
        file.type,
        reader.result,
        file.lastModifiedDate
      )
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

  prepareProgressBars (progressBars) {
    for (let index = 0; index < progressBars.length; index++) {
      const progressBar = progressBars[index]
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
