const { Message, Template } = require('./src/models')
const { BaseController, MessagesController, TemplatesController } = require('./src/controllers')

// const msgCtrl = new BaseController({ model: Message })
// const tmpCtrl = new BaseController({ model: Template })

const msgCtrl = new MessagesController()
const tmpCtrl = new TemplatesController()

const run = async () => {
  const templates = await tmpCtrl.index()
  const messages = await msgCtrl.index()

  console.log(templates)
  console.log(messages)
  console.log('done')
}

run()
