const dynamoose = require('dynamoose')

if (process.env.LOCAL_DYNAMO) {
  dynamoose.local()
}

module.exports = dynamoose
