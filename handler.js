const Sentencer = require('sentencer')

module.exports.message = async (event, context) => {
  const message = Sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it.")

  return {
    statusCode: 200,
    body: JSON.stringify({
      message
    }),
  }
}
