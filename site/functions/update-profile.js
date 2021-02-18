const axios = require('axios');
const FaunaService = require('@brianmmdev/faunaservice')

exports.handler = async event => {
  let response = {};
  if(event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      }
    }
  }
  const body = JSON.parse(event.body);

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
  let userId = res.data.id

  let faunaService = new FaunaService(process.env.FAUNA_SECRET)
  console.log(userId)
  let currentRecord = await faunaService.getRecordByIndex('profilesByUserId', userId)
  if(!currentRecord) {
    await faunaService.createRecord('profiles', {
      userId,
      document: {
        twitter: body.twitter,
        github: body.github,
        website: body.website
      }
    })
    response = {
      statusCode: 201
    }
  } else {
    await faunaService.updateRecord('profiles', currentRecord.id, {
      userId,
      document: {
        twitter: body.twitter,
        github: body.github,
        website: body.website
      }
    })
    response = {
      statusCode: 200
    }
  }

  // Handle CORS
  if(!response.headers) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    }
  } else {
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
  }

  return response
}