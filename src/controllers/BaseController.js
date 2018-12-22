const REQUIRED_RESPONSE_HEADERS = {
  /* Required for CORS support to work */
  'Access-Control-Allow-Origin': '*',
  /* Required for cookies, authorization headers with HTTPS */
  'Access-Control-Allow-Credentials': true
}

class BaseController {
  constructor(options = {}) {
    this.model = options.model
  }

  async _exec(action, event, context) {
    const {
      headers,
      path,
      pathParameters,
      requestContext,
      resource,
      httpMethod,
      queryStringParameters,
      multiValueQueryStringParameters,
      stageVariables,
      body,
      isOffline
    } = event

    let parsedBody = null

    if (body) {
      parsedBody = JSON.parse(body)

      if (typeof parsedBody['body'] === 'string') {
        parsedBody['body'] = parsedBody['body'].replace(/\[\[ ([a-z_]+) \]\]/g, '{{ $1 }}')
      }
    }

    switch(action) {
      case 'index':
        const all = await this.model.scan().exec()
        return this._ok(all)
      case 'create':
        const newItem = new this.model(parsedBody)
        await newItem.save()
        return this._created(newItem)
      case 'show':
      case 'update':
      case 'destroy':
        if (!pathParameters['id']) {
          return this._bad()
        }

        const item = await this.model.get(pathParameters['id'])

        console.log('item is', item)

        if (!item) {
          return this._not_found()
        }

        if (action === 'update') {
          Object.assign(item, parsedBody)
          await item.save()
        } else if (action === 'destroy') {
          await item.delete()
        }

        return this._ok(item)
      default:
        return this._bad()
    }
  }

  async index(event, context) {
    return await this._exec('index', event, context)
  }

  async create(event, context) {
    return await this._exec('create', event, context)
  }

  async show(event, context) {
    return await this._exec('show', event, context)
  }

  async update(event, context) {
    return await this._exec('update', event, context)
  }

  async destroy(event, context) {
    return await this._exec('destroy', event, context)
  }

  _respond (options = {}) {
    const response = {
      statusCode: 400,
      headers: REQUIRED_RESPONSE_HEADERS
    }

    Object.assign(response, options)

    if (response.body && typeof response.body !== 'string') {
      response.body = JSON.stringify(response.body)
    }

    return response
  }

  _ok (body, options = {}) {
    console.log('OK')
    const response = Object.assign({
      statusCode: 200,
      body
    }, options)

    return this._respond(response)
  }

  _created (body, options = {}) {
    console.log('Created')
    const response = Object.assign({
      statusCode: 201,
      body: body || { message: 'Created' }
    }, options)

    return this._respond(response)
  }

  _bad (body, options = {}) {
    const response = Object.assign({
      statusCode: 400,
      body: body || { message: 'Bad Request' }
    }, options)

    return this._respond(response)
  }

  _not_found (body, options = {}) {
    const response = Object.assign({
      statusCode: 404,
      body: body || { message: 'Not Found' }
    }, options)

    return this._respond(response)
  }

  _error (body, options = {}) {
    console.log('ERROR')
    const response = Object.assign({
      statusCode: 500,
      body: body || { message: 'Unknown Error' }
    }, options)

    return this._respond(response)
  }
}

module.exports = BaseController