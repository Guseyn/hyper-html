'use strict'

if (!sessionStorage.getItem('isFirstStatePushedToHistory')) {
  sessionStorage.setItem('isFirstStatePushedToHistory', 'false')
}

window.onpopstate = (event) => {
  if (event.state) {
    document.body.innerHTML = event.state.body
    document.title = event.state.title
  }
}

window.onbeforeunload = () => {
  sessionStorage.removeItem('isFirstStatePushedToHistory')
}