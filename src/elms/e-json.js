'use strict'

const { browserified, as } = require('@page-libs/cutie')
const { CreatedOptions, TheSameObjectWithValue } = browserified(require('@cuties/object'))
const { ParsedJSON } = browserified(require('@cuties/json'))
const { StringFromBuffer } = browserified(require('@cuties/buffer'))
const { ResponseFromAjaxRequest, ResponseBody } = require('@page-libs/ajax')
const { UnwrappedChildrenOfParent } = require('@page-libs/dom')
const ElementWithAppliedDataTextAndValueAttributesForChildNodes = require('./../async/ElementWithAppliedDataTextAndValueAttributesForChildNodes')
const HTMLTunedElement = require('./../objects/HTMLTunedElement')

class EJSON extends HTMLTunedElement {
  constructor () {
    super()
    this.cache = {}
  }

  static get observedAttributes () {
    return ['data-src', 'data-method', 'data-headers', 'data-request-body', 'data-object']
  }

  render () {
    new ParsedJSON(
      new StringFromBuffer(
        new ResponseBody(
          new ResponseFromAjaxRequest(
            new CreatedOptions(
              'url', this.attributeWithAppliedLocalStorageVariables(
                this.attributeWithAppliedMemoryStorageVariables(
                  this.getAttribute('data-src')
                )
              ),
              'method', this.getAttribute('data-method') || 'GET',
              'headers', new ParsedJSON(
                this.attributeWithAppliedLocalStorageVariables(
                  this.attributeWithAppliedMemoryStorageVariables(
                    this.getAttribute('data-headers') || '{}'
                  )
                )
              )
            ),
            this.attributeWithAppliedLocalStorageVariables(
              this.attributeWithAppliedMemoryStorageVariables(
                this.getAttribute('data-request-body')
              )
            )
          )
        )
      )
    ).as('RESPONSE').after(
      new TheSameObjectWithValue(
        this.cache,
        this.getAttribute('data-object'),
        as('RESPONSE')
      ).after(
        new UnwrappedChildrenOfParent(
          new ElementWithAppliedDataTextAndValueAttributesForChildNodes(
            this, this.cache
          )
        )
      )
    ).call()
  }
}

module.exports = EJSON
