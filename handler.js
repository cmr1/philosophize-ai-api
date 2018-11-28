const Sentencer = require('sentencer')
const dynamoose = require('dynamoose')

const { Message, Template } = require('./src/models')
const { MessagesController, TemplatesController } = require('./src/controllers')

templatesController = new TemplatesController()
messagesController = new MessagesController()

const methods = [ 'index', 'show', 'create', 'update', 'destroy', 'generate' ]
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
