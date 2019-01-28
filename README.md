<h1 align="center">
  API Documentation Creator
</h1>

### Installation
1. Add as a package dependency
```
$ npm install ab-docs --save
```
2. Require it in your code
```javascript
const { withDocs } = require('ab-docs')
```
4. Create a swagger specification to pass into the function.
A base specification should be provided with an info object (containing at least the title and version strings) and any other global descriptions.
```javascript
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
      },
    ]
  },
  specOptions: {
    defaultResponses: {}
  }
}
```
3. Use `withDocs` function like so:
```javascript
const { withDocs } = require('ab-docs')

withDocs(router, routes, baseSpec, specOptions)
```

### Accessing API Documentation
Endpoint: `/docs`

Example endpoint structure:
```javascript
{
    method: 'get',
    path: '/endpoint',
    validate: {
      type: 'json',
      body: Joi.object({
        property: 'value'
      })
      output: {
        200: {
          body: Joi.object({
            property: 'value'
          }).description('...')
        },
        404: {
          body: Joi.object({
            errors: Joi.array().items(
              {
                property: 'value'
              }
            )
          }).description('...')
        }
      }
    },
    meta: {
      swagger: {
        summary: '...',
        description: '...',
        tags: [ 'refer to existing tags in config file' ]
      }
    },
    handler: ...
  }
```