const uuidv1 = require('uuid/v1')
const dynamoose = require('dynamoose')
const { Schema } = dynamoose

const MessageSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
    default: (model) => uuidv1()
  },
  template_id: {
    type: String,
    required: true,
    rangeKey: true,
    index: true
  },
  body: {
    type: String,
    validate: (msg) => msg.trim() !== ''
  }
})

module.exports = dynamoose.model('Message', MessageSchema)
