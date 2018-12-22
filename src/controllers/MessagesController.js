const { Template, Message } = require('../models')
const BaseController = require('./BaseController')

class MessagesController extends BaseController {
  constructor () {
    super({ model: Message })
  }

  async generate (event, context) {
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
      return this._not_found(`No template to generate message!`)
    }

    const msg = template.generateMessage()

    await msg.save()

    return this._ok(msg)
  }
}

module.exports = MessagesController
