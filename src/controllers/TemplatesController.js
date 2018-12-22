const { Template, Message } = require('../models')
const BaseController = require('./BaseController')

const DEFAULT_BODY = 'This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

class TemplatesController extends BaseController {
  constructor () {
    super({ model: Template })
  }
}

module.exports = TemplatesController
