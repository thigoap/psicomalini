const contentful = require('contentful');

const client = contentful.createClient({
  // host: "preview.contentful.com",
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = () => {
  return client
  .getEntries({ 
    content_type: 'post',
    order: 'fields.data'
  })
  .then((response) => {
    //console.log(response.items)
    //console.log('response', response.items[0].fields.texto.content)
    return response.items
  })
  .catch(console.error)
}
