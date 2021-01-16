const axios = require('axios')

exports.handler = async event => {
  let response = {};
  if(event.httpMethod === 'OPTIONS') {
    response.statusCode = 200
  }
  console.log(event.body)
  const body = JSON.parse(event.body);
  console.log('body', body)

  
  let data = {
    'client_id': '739144597934178367',
    'client_secret': 'p_kFjG8_AyoFVV9S9HV-ewATsbMe4yqb',
    'grant_type': 'authorization_code',
    'code': body.code,
    'redirect_uri': 'http://localhost:8080/oauth-handler',
    'scope': 'identify'
  }
      
  // TODO: Move to env vars

  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  // request code
  let opts = {
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formBody
  }

  let res = await axios(opts);
  repsonse = {
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