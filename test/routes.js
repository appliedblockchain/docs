'use strict'

const koaRouter = require('koa-joi-router')
const router = koaRouter()

const routes = [
  {
    method: 'post',
    path: '/companies',
    meta: {
      swagger: {
        summary: 'Summary of route',
        description: 'Description of route',
        tags: [ 'tag' ]
      }
    },
    handler: () => {}
  }
]

router.route(routes)

module.exports = router
