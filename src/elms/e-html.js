'use strict'

const { browserified } = require('@page-libs/cutie')
const { CreatedOptions } = browserified(require('@cuties/object'))
const { ParsedJSON } = browserified(require('@cuties/json'))
const { ResponseFromAjaxRequest, ResponseBody } = require('@page-libs/ajax')
const { UnwrappedChildrenOfParent, ElementWithInnerHTML } = require('@page-libs/dom')
const HTMLTunedElement = require('./../objects/HTMLTunedElement')

class EHTML extends HTMLTunedElement {
  constructor () {
    super()
  }

  static get observedAttributes () {
    return ['data-src', 'data-headers']
  }

  render () {
    new UnwrappedChildrenOfParent(
      new ElementWithInnerHTML(
        this, new ResponseBody(
          new ResponseFromAjaxRequest(
            new CreatedOptions(
              'url', this.attributeWithAppliedLocalStorageVariables(
                this.attributeWithAppliedMemoryStorageVariables(
                  this.getAttribute('data-src')
                )
              ),
              'method', 'GET',
              'headers', new ParsedJSON(
                this.attributeWithAppliedLocalStorageVariables(
                  this.attributeWithAppliedMemoryStorageVariables(
                    this.getAttribute('data-headers') || '{}'
                  )
                )
              )
            )
          )
        )
      )
    ).call()
  }
}

module.exports = EHTML
