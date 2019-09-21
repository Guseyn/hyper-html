'use strict'

const { browserified } = require('@page-libs/cutie')
const { CreatedOptions } = browserified(require('@cuties/object'))
const { ResponseFromAjaxRequest, ResponseBody } = require('@page-libs/ajax')
const { ElementWithInnerHTML, ElementWithAdditionalHTML } = require('@page-libs/dom')
const RedirectedLocation = require('./../async/RedirectedLocation')
const LocalStorageWithSetValue = require('./../async/LocalStorageWithSetValue')
const SessionStorageWithSetValue = require('./../async/SessionStorageWithSetValue')
const HiddenElements = require('./../async/HiddenElements')
const ShownElements = require('./../async/ShownElements')
const DisabledElements = require('./../async/DisabledElements')
const EnabledElements = require('./../async/EnabledElements')
const ElementWithMappedObject = require('./../async/ElementWithMappedObject')
const ElementsWithChangedClass = require('./../async/ElementsWithChangedClass')
const FirstOf = require('./../async/FirstOf')
const ParsedElmSelectors = require('./../async/ParsedElmSelectors')
const ParsedJSONOrString = require('./../async/ParsedJSONOrString')

const actions = {
  redirect: (url) => {
    return new RedirectedLocation(url)
  },

  saveToLocalStorage: (key, value) => {
    return new LocalStorageWithSetValue(localStorage, key, value)
  },

  saveToSessionStorage: (key, value) => {
    // eslint-disable-next-line no-undef
    return new SessionStorageWithSetValue(sessionStorageWrapper, key, value)
  },

  hideElms: (...elmSelectors) => {
    return new HiddenElements(
      new ParsedElmSelectors(...elmSelectors)
    )
  },

  showElms: (...elmSelectors) => {
    return new ShownElements(
      new ParsedElmSelectors(...elmSelectors)
    )
  },

  disableElms: (...elmSelectors) => {
    return new DisabledElements(
      new ParsedElmSelectors(...elmSelectors)
    )
  },

  enableElms: (...elmSelectors) => {
    return new EnabledElements(
      new ParsedElmSelectors(...elmSelectors)
    )
  },

  innerHTML: (elmSelector, url, headers) => {
    return new ElementWithInnerHTML(
      new FirstOf(
        new ParsedElmSelectors(elmSelector)
      ),
      new ResponseBody(
        new ResponseFromAjaxRequest(
          new CreatedOptions(
            'url', url,
            'method', 'GET',
            'headers', new ParsedJSONOrString(
              headers || '{}'
            )
          )
        )
      )
    )
  },

  addHTMLTo: (elmSelector, url, headers) => {
    return new ElementWithAdditionalHTML(
      new FirstOf(
        new ParsedElmSelectors(elmSelector)
      ),
      new ResponseBody(
        new ResponseFromAjaxRequest(
          new CreatedOptions(
            'url', url,
            'method', 'GET',
            'headers', new ParsedJSONOrString(
              headers || '{}'
            )
          )
        )
      )
    )
  },

  mapObjToElm: (elmSelector, obj) => {
    return new ElementWithMappedObject(
      new FirstOf(
        new ParsedElmSelectors(elmSelector)
      ), obj
    )
  },

  changeElmsClassName: (newClassName, ...elmSelectors) => {
    return new ElementsWithChangedClass(
      newClassName,
      new ParsedElmSelectors(...elmSelectors)
    )
  }
}

class ActionByNameWithParams {
  constructor (name, ...params) {
    this.name = name
    this.params = params
  }

  value () {
    if (!actions[this.name]) {
      throw new Error(`no such action with name ${this.name}`)
    }
    return actions[this.name](...this.params)
  }
}

module.exports = ActionByNameWithParams
