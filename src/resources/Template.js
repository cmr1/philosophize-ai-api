const { Resource } = require('@bowtie/api-resource')

class Template extends Resource {
  static get ModelName() {
    return 'templates'
  }
}

module.exports = Template
