'use strict'

class HTMLTunedElement extends HTMLElement {
  constructor () {
    super()
    this.rendered = false
  }

  replacedWith (elm) {
    const instance = this
    instance.getAttributeNames().forEach(name => {
      elm.setAttribute(name, instance.getAttribute(name))
    })
    while (instance.firstChild) {
      const child = instance.removeChild(instance.firstChild)
      elm.appendChild(child)
    }
    instance.parentNode.replaceChild(elm, instance)
    return elm
  }

  attributeWithAppliedLocalStorageVariables (attribute) {
    attribute = attribute || ''
    return attribute.replace(/\$\{localStorage\.(.+)\}/g, (match, p1, offset, string) => {
      return localStorage.getItem(p1)
    })
  }

  attributeWithAppliedMemoryStorageVariables (attribute) {
    attribute = attribute || ''
    return attribute.replace(/\$\{memoryStorage\.(.+)\}/g, (match, p1, offset, string) => {
      // eslint-disable-next-line no-undef
      return memoryStorage.getItem(p1)
    })
  }

  connectedCallback () {
    const instance = this
    const childrenConnectedCallback = () => {
      if (!instance.rendered) {
        instance.render()
        instance.rendered = true
      }
    }
    const observer = new MutationObserver(childrenConnectedCallback)
    const config = { attributes: false, childList: true, subtree: true }
    observer.observe(instance, config)
    setTimeout(() => {
      observer.disconnect()
    })
  }
}

module.exports = HTMLTunedElement
