const axios = require('axios');

exports.handler = async event => {
  return {
    statusCode: 404
  }
  // let response = {};
  // if(event.httpMethod === 'OPTIONS') {
  //   return {
  //     statusCode: 200,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': '*'
  //     }
  //   }
  // }
  // let faunaService = new FaunaService(process.env.FAUNA_SECRET)

  // let profiles = await faunaService.listRecords("profiles")
  // profiles = profiles.filter(p => p.document.isPublic)

  // response = {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(profiles)
  // }

  // // Handle CORS
  // if(!response.headers) {
  //   response.headers = {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': '*'
  //   }
  // } else {
  //   response.headers['Access-Control-Allow-Origin'] = '*'
  //   response.headers['Access-Control-Allow-Headers'] = '*'
  // }

  // return response
}