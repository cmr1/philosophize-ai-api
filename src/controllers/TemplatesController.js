const { Template, Message } = require('../models')
const BaseController = require('./BaseController')

const DEFAULT_BODY = 'This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.'

class TemplatesController extends BaseController {
  constructor () {
    super({ model: Template })
  }

  async generate () {
    try {
      const all = await this.model.scan().exec()

      // console.log(all)

      if (all.length > 0) {
        const template = all[0]

        const msg = template.generateMessage()

        // console.log(msg)

        await msg.save()

        return this._ok(msg)
      } else {
        return this.create({ body: DEFAULT_BODY })
      }
    } catch (err) {
      console.error(err)
      return this._error(err)
    }
  }
}

module.exports = TemplatesController
