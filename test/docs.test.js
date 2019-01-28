const request = require('supertest')
const { withDocs } = require('..')
const Koa = require('koa')
const koaRouter = require('koa-joi-router')
const router = koaRouter()
const { baseSpec, specOptions } = require('./swagger-docs-config')
const routes = [ require('./routes') ]

describe('withDocs', ()=> {
  it('errors without router argument', () => {
    const response = () => withDocs()
    expect(response).toThrowError('Router required')
  })

  it('errors without router argument', () => {
    const response = () => withDocs(router)
    expect(response).toThrowError('Routes required')
  })

  it('errors without base specification argument', () => {
    const response = () => withDocs(router, routes)
    expect(response).toThrowError('Base specifications required')
  })

  it('to return a function', () => {
    expect(typeof withDocs).toBe('function')
  })

  describe('apiDocs', () => {
    let server

    beforeEach(async () => {
      const app = await new Koa()
      const router = koaRouter()
      withDocs(router, routes, baseSpec, specOptions)

      app.use(router.middleware())

      server = app.listen()
    })

    afterEach(async () => {
      await server.close()
    })

    it('endpoint should return json file', () => {
      return request(server)
        .get('/swagger.json')
        .expect(200)
        .then((ctx) => {
          const res = JSON.parse(ctx.res.text)
          const propertyNames = Object.keys(res)
          expect(propertyNames).toContain('info')
          expect(propertyNames).toContain('basePath')
          expect(propertyNames).toContain('tags')
        })
    })

    it('endpoint should return a static site', () => {
      return request(server)
        .get('/docs')
        .expect(200)
        .then((ctx) => {
          const res = ctx.res.text
          expect(res).toContain('html')
          expect(res).toContain('head')
          expect(res).toContain('body')
        })
    })
  })
})
