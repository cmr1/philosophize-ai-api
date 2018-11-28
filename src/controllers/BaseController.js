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

  _respond (options) {
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

  _ok(body, options = {}) {
    console.log("OK")
    const response = Object.assign({
      statusCode: 200,
      body
    }, options)

    return this._respond(response)
  }

  _bad(body, options = {}) {
    const response = Object.assign({
      statusCode: 400,
      body
    }, options)

    return this._respond(response)
  }

  _error(body, options = {}) {
    console.log("ERROR")
    const response = Object.assign({
      statusCode: 500,
      body
    }, options)

    return this._respond(response)
  }

  _not_found(body, options = {}) {
    const response = Object.assign({
      statusCode: 404,
      body
    }, options)

    return this._respond(response)
  }

  _unauthorized(body, options = {}) {
    const response = Object.assign({
      statusCode: 401,
      body
    }, options)

    return this._respond(response)
  }

  _forbidden(body, options = {}) {
    const response = Object.assign({
      statusCode: 401,
      body
    }, options)

    return this._respond(response)
  }

  async index (event, context) {
    // const { id, body } = event

    try {
      const all = await this.model.scan().exec()

      console.log(this.model, all)

      return this._ok(all)
    } catch (err) {
      return this._error(err)
    }
  }

  async show (event, context) {
    const { id } = event

    try {
      const item = await this.model.get(id)

      return this._ok(item)
    } catch (err) {
      return this._error(err)
    }
  }

  async destroy (event, context) {
    const { id } = event

    try {
      const item = await this.model.get(id)

      await item.delete()

      return this._ok(item)
    } catch (err) {
      return this._error(err)
    }
  }

  async create (event, context) {
    const { body } = event

    try {
      const newItem = new this.model(body)

      await newItem.save()

      return this._ok(newItem)
    } catch (err) {
      return this._error(err)
    }
  }

  async update (event, context) {
    const { id, body } = event

    try {
      const item = await this.model.get(id)

      Object.assign(item, body)

      await item.save()

      return this._ok(item)
    } catch (err) {
      return this._error(err)
    }
  }
}

module.exports = BaseController
