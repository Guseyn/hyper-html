// custom call
// err, {statusCode, headers, body} in callback
// options: {url, method, headers, mimeType, withCredentials, user, password, timeout, progressEvent, uploadProgressEvent}
const responseFromAjaxRequest = (options, requestBody, callback) => {
  let resObj = {}
  const req = new XMLHttpRequest()
  req.open(options.method, options.url, true, options.user || null, options.password || null)
  req.withCredentials = options.withCredentials || false
  req.timeout = options.timeout || 0
  if (options.overrideMimeType !== undefined) {
    req.overrideMimeType(options.overrideMimeType)
  }
  let headers = options.headers || {}
  for (let headerName in headers) {
    req.setRequestHeader(headerName, headers[headerName])
  }
  req.onreadystatechange = function () {
    if (req.readyState === req.DONE) {
      let allHeadersStr = req.getAllResponseHeaders().trim()
      let headerMap = {}
      let headers = allHeadersStr.split(/[\r\n]+/)
      headers.forEach(line => {
        let parts = line.split(/:\s*/)
        let header = parts.shift()
        let value = parts.join(': ')
        headerMap[header] = value
      })
      resObj.statusCode = req.status
      resObj.headers = headerMap
      resObj.body = req.response
      callback(null, resObj)
    }
  }
  req.addEventListener('progress', options.progressEvent)
  req.upload.addEventListener('progress', options.uploadProgressEvent)
  req.send(requestBody)
}

module.exports = responseFromAjaxRequest
