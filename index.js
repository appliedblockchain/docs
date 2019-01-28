'use strict'

const { SwaggerAPI } = require('koa-joi-router-docs')
const docsHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example API</title>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
  </head>
  <body>
    <redoc spec-url='swagger.json' lazy-rendering></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
  </html>
`

const withDocs = function (
  router,
  routes,
  baseSpec,
  specOptions = {}
) {
  if (!router) {
    throw new Error('Router required')
  }

  if (!routes) {
    throw new Error('Routes required')
  }

  if (!baseSpec) {
    throw new Error('Base specifications required')
  }

  const docsGenerator = new SwaggerAPI()
  routes.forEach(route => docsGenerator.addJoiRouter(route))
  const spec = docsGenerator.generateSpec(baseSpec, specOptions)

  router.get('/swagger.json', ctx => {
    ctx.body = spec
  })

  router.get('/docs', ctx => {
    ctx.body = docsHtml
  })
}

module.exports = {
  withDocs
}
