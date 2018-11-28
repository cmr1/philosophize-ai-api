const Sentencer = require('sentencer')
const dynamoose = require('dynamoose')

module.exports.message = async (event, context) => {
  const message = Sentencer.make('This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.')

  console.log(message)

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message
    })
  }
}

module.exports.stuff = async (event, context) => {
  // Create cat model with default options
  const Cat = dynamoose.model('Cat', { id: Number, name: String })

  // Create a new cat object
  const garfield = new Cat({ id: 666, name: 'Garfield' })

  // Save to DynamoDB
  garfield.save()

  // Lookup in DynamoDB
  const badCat = await Cat.get(666)

  const allCats = await Cat.batchGet([{ id: 666 }])

  console.log(allCats)

  const message = 'Never trust a smiling cat. - ' + badCat.name

  console.log(message)

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      allCats,
      badCat,
      message
    })
  }
}
