'use strict'

const path = require('path')
const { AsyncObject } = require('@cuties/cutie')
const { ExecutedLint } = require('@cuties/wall')
const { SpawnedCommand } = require('@cuties/spawn')
const {
  Backend,
  RestApi,
  RequestParams,
  Endpoint,
  ServingFilesEndpoint,
  NotFoundEndpoint
} = require('@cuties/rest')
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithHeader,
  ResponseWithStatusMessage,
  ResponseWithStatusCode
} = require('@cuties/http')
const {
  CopiedFile,
  WatcherWithEventTypeAndFilenameListener
} = require('@cuties/fs')
const { ReadDataByPath } = require('@cuties/fs')
const { StringifiedJSON } = require('@cuties/json')
const { Value } = require('@cuties/object')

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '')
  return path.join(...parts)
}

class GetUserEndpoint extends Endpoint {
  constructor (regexp) {
    super(regexp, 'GET')
  }

  body (request, response) {
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 200), 'ok'
          ),
          'Content-Type', 'application/json'
        ),
        new StringifiedJSON(
          new User(
            new Value(
              new RequestParams(
                request
              ), 'id'
            )
          )
        )
      )
    )
  }
}

class User extends AsyncObject {
  constructor (id) {
    super(id)
  }

  syncCall () {
    return (id) => {
      return {
        name: `Name${id}`,
        email: `${id}@email.com`
      }
    }
  }
}

new SpawnedCommand('grunt').after(
  new ExecutedLint(process, './src', './test').after(
    new WatcherWithEventTypeAndFilenameListener('./src', { persistent: true, recursive: true, encoding: 'utf8' }, (eventType, fileName) => {
      if (eventType === 'change') {
        new SpawnedCommand('grunt').after(
          new CopiedFile('ehtml.bundle.min.js', './examples/js/ehtml.bundle.min.js')
        ).call()
      }
    }).after(
      new CopiedFile('ehtml.bundle.min.js', './examples/js/ehtml.bundle.min.js').after(
        new Backend(
          'http', 
          8000, 
          '127.0.0.1',
          new RestApi(
            new GetUserEndpoint(/^\/user\?id=(\d+)/),
            new ServingFilesEndpoint(
              new RegExp(/^(\/|)/),
              mapper,
              {}, 
              new NotFoundEndpoint(new RegExp(/\/not-found/))
            ),
            new NotFoundEndpoint(new RegExp(/\/not-found/))
          )
        )
      )
    )
  )
).call()
