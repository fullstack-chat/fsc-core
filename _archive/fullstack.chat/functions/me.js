const axios = require('axios')
const FaunaService = require('@brianmmdev/faunaservice')

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

  try {
    let res = await axios(opts);
    let userData = res.data;

    // Fetch XP data
    let faunaService = new FaunaService(process.env.FAUNA_SECRET)
    // let xpData = await faunaService.fetchRecordsInIndex('idxByKey');
    let xpData = await faunaService.getRecordByIndex('idxByKey', 'xpdata')
    userData.xpData = xpData.document[res.data.id]

    // Fetch profile data
    let profile = await faunaService.getRecordByIndex('profilesByUserId', res.data.id)
    if(profile) {
      userData.profile = profile.document
    }

    response = {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch (err) {
    if(err.response.status === 401) {
      response = {
        statusCode: 401
      }
    } else {
      console.error(err)
      response = {
        statusCode: 500
      }
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