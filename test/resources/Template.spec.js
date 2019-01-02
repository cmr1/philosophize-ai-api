const { expect } = require('chai')
const { Template } = require('../../src/resources')

describe('Template', function() {
  let template, templates

  it('create', async () => {
    template = await Template.create({
      body: 'New Template {{ noun }}'
    })

    expect(template).to.be.an.instanceOf(Template)
  })

  it('all', async () => {
    templates = await Template.all()

    expect(templates[0]).to.be.an.instanceOf(Template)
  })

  it('get', async () => {
    const findTemplate = await Template.get(template.id)

    expect(findTemplate).to.be.an.instanceOf(Template)
    expect(findTemplate).to.eql(template)
  })

  it('update', async () => {
    const body = 'Updated body with {{ an_adjective }} {{ noun }}'

    await template.update({ body })

    expect(template.body).to.be.eql(body)
  })

  it('destroy', async () => {
    await template.destroy()

    // const findTemplate = await Template.get(template.id)

    // expect(findTemplate).to.be.an.instanceOf(Template)
    // expect(findTemplate).to.eql(template)
  })
})
