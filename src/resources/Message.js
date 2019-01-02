const { Resource } = require('@bowtie/api-resource')

class Message extends Resource {
  static get ModelName() {
    return 'messages'
  }
}

module.exports = Message
