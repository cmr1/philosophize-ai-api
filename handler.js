const fs = require('fs-extra')
const { BaseController, MessagesController, TemplatesController } = require('./src/controllers')

templatesController = new TemplatesController()
messagesController = new MessagesController()

const methods = [ 'index', 'show', 'create', 'update', 'destroy' ]
const controllers = {
  templates: templatesController,
  messages: messagesController
}

Object.keys(controllers).forEach(model => {
  const ctrl = controllers[model]

  methods.forEach(method => {
    if (typeof ctrl[method] === 'function') {
      module.exports[`${model}_${method}`] = ctrl[method].bind(ctrl)
    }
  })
})

module.exports.spec = async (event, context) => {
  return {
    statusCode: 200,
    headers: BaseController.REQUIRED_RESPONSE_HEADERS,
    body: fs.readFileSync('spec.yml').toString()
  }
}
