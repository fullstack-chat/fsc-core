exports.handler = async event => {
  let response = {};
  if(event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }
  }
  response = {
    statusCode: 200,
    body: "hello world!"
  }

  // Handle CORS
  if(!response.headers) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  } else {
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
  }

  return response
}