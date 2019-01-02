const { expect } = require('chai')
const { Message } = require('../../src/resources')

describe('Message', function() {
  let message, messages

  it('create', async () => {
    message = await Message.create({
      template_body: 'New Message {{ noun }}'
    })

    expect(message).to.be.an.instanceOf(Message)
  })

  it('all', async () => {
    messages = await Message.all()

    expect(messages[0]).to.be.an.instanceOf(Message)
  })

  it('get', async () => {
    const findTemplate = await Message.get(message.id)

    expect(findTemplate).to.be.an.instanceOf(Message)
    expect(findTemplate).to.eql(message)
  })

  it('update', async () => {
    const body = 'Updated body'

    await message.update({ body })

    expect(message.body).to.be.eql(body)
  })

  it('destroy', async () => {
    await message.destroy()

    // const findTemplate = await Message.get(message.id)

    // expect(findTemplate).to.be.an.instanceOf(Message)
    // expect(findTemplate).to.eql(message)
  })
})
