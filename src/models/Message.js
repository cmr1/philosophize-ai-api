const uuidv1 = require('uuid/v1')
const dynamoose = require('dynamoose')
const { Schema } = dynamoose

const MessageSchema = new Schema({
  id: {
    type: String,
    required: true,
    hashKey: true,
    default: (model) => uuidv1()
  },
  template_id: {
    type: String,
    required: true,
    validate: (id) => id.trim() !== ''
  },
  body: {
    type: String,
    validate: (msg) => msg.trim() !== ''
  }
})

module.exports = dynamoose.model('Message', MessageSchema)
