'use strict'

const { version, name } = require('../package.json')

module.exports = {
  baseSpec: {
    info: {
      title: name,
      description: 'API description',
      version
    },
    basePath: '/',
    tags: [
      {
        name: 'tag name',
        description: 'tag description'
      }
    ]
  },
  specOptions: {
    defaultResponses: {}
  }
}
