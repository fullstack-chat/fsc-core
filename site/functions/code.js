const axios = require('axios')

exports.handler = async event => {
  let response = {};
  if(event.httpMethod === 'OPTIONS') {
    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }
    return response
  }
  console.log(event)
  const body = JSON.parse(event.body);
  console.log('body', body)

  let data = {
    'client_id': process.env.DISCORD_CLIENT_ID,
    'client_secret': process.env.DISCORD_CLIENT_SECRET,
    'grant_type': 'authorization_code',
    'code': body.code,
    'redirect_uri': process.env.DISCORD_REDIRECT_URI,
    'scope': 'identify'
  }
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  // request code
  let opts = {
    url: 'https://discord.com/api/oauth2/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formBody
  }

  try {
    let res = await axios(opts);
    response = {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch (err) {
    console.log(err)
    response = {
      statusCode: 400
    }
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