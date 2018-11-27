const Sentencer = require('sentencer')

module.exports.message = async (event, context) => {
  const message = Sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.")

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
    }),
  }
}
