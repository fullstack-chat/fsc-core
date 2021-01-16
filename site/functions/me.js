const axios = require('axios')

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

  // let body = event.body
  // console.log(body)
  // if(typeof body === "string") {
  //   body = JSON.parse(body)
  // }

  let token = event.headers['authorization'].split(' ')[1]

  // request code
  let opts = {
    url: 'https://discord.com/api/users/@me',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  }

  let res = await axios(opts);
  response = {
    statusCode: 200,
    body: JSON.stringify(res.data)
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