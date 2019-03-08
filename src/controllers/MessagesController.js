const { Template, Message } = require('../models')
const BaseController = require('./BaseController')

class MessagesController extends BaseController {
  constructor () {
    super({ model: Message })
  }

  async create (event, context) {
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

    let template, parsedBody

    if (body) {
      parsedBody = JSON.parse(body)
    }

    const params = Object.assign({}, parsedBody || {}, queryStringParameters || {}, pathParameters || {})

    if (params['template_id']) {
      template = await Template.get(params['template_id'])
    } else if (params['template_body']) {
      params['template_body'] = params['template_body'].replace(/\[\[ ([a-z_]+) \]\]/g, '{{ $1 }}')

      const findByBody = await Template.scan().filter('body').eq(params['template_body']).exec()

      if (findByBody.length > 0) {
        template = findByBody[0]
      } else {
        template = new Template({ body: params['template_body'] })
        await template.save()
      }
    } else {
      const all = await Template.scan().exec()

      if (all.length > 0) {
        const rand = Math.floor(Math.random() * Math.floor(all.length))

        template = all[rand]
      }
    }

    if (!template) {
      return this._not_found({ message: `No template to generate message!` })
    }

    const msg = template.generateMessage()

    await msg.save()

    return this._created(msg)
  }

  async upvote (event, context) {
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

    if (!pathParameters['id']) {
      return this._bad()
    }

    const item = await this.model.get(pathParameters['id'])

    console.log('item is', item)

    if (!item) {
      return this._not_found()
    }

    Object.assign(item, { votes: item.votes + 1 })
    await item.save()

    return this._ok(item)
  }

  async downvote (event, context) {
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

    if (!pathParameters['id']) {
      return this._bad()
    }

    const item = await this.model.get(pathParameters['id'])

    console.log('item is', item)

    if (!item) {
      return this._not_found()
    }

    Object.assign(item, { votes: item.votes - 1 })
    await item.save()

    return this._ok(item)
  }
}

module.exports = MessagesController
