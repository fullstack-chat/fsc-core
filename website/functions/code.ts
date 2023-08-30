import { HandlerContext, HandlerEvent } from "@netlify/functions";

exports.handler = async (event: HandlerEvent, context: HandlerContext)  => {
  if(event.body) {
    const body = JSON.parse(event.body);

    let data = {
      'client_id': process.env.DISCORD_CLIENT_ID,
      'client_secret': process.env.DISCORD_CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': body.code,
      'redirect_uri': process.env.DISCORD_REDIRECT_URI,
      'scope': 'identify'
    }
    let formBodyArr: string[] = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBodyArr.push(encodedKey + "=" + encodedValue);
    }
    const formBody = formBodyArr.join("&");
  
    try {
      const res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      });
      const json = await res.json()

      return {
        statusCode: 200,
        body: JSON.stringify(json)
      }
    } catch (err) {
      console.error(err)
      return {
        statusCode: 400
      }
    }
  } else {
    return {
      statusCode: 500
    }
  }
}