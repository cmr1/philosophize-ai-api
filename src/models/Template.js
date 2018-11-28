const uuidv1 = require('uuid/v1')
const dynamoose = require('dynamoose')
const { Schema } = dynamoose
const { Message } = require('./')
const Sentencer = require('sentencer')

const TemplateSchema = new Schema({
  id: {
    type: String,
    required: true,
    hashKey: true,
    default: (model) => uuidv1()
  },
  body: {
    type: String,
    required: true,
    validate: (msg) => msg.trim() !== ''
  }
})

TemplateSchema.method('generateMessage', function (options = {}) {
  return new Message({
    template_id: this.id,
    body: Sentencer.make(this.body)
  })
})

module.exports = dynamoose.model('Template', TemplateSchema)
