const { Template, Message } = require('../models')
const BaseController = require('./BaseController')

class MessagesController extends BaseController {
  constructor() {
    super({ model: Message })
  }
}

module.exports = MessagesController
