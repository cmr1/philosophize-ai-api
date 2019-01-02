const { Message, Template } = require('../src/resources')

const listAll = async () => {
  const templates = await Template.all()
  const messages = await Message.all()

  console.log('All Templates', templates)
  console.log('All Messages', messages)
}

const debug = async () => {
  await listAll()

  const template = await Template.create({
    body: 'Hello {{ noun }}'
  })

  console.log('New Template', template)

  await listAll()

  const message = await Message.create({}, { template_id: template.id })

  console.log('New Message', message)

  await listAll()

  await message.update({ body: 'updated' })

  console.log('Updated Message', message)

  await listAll()

  await message.destroy()
  await template.destroy()

  await listAll()
}

debug()
