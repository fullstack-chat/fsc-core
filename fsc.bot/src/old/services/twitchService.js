const axios = require('axios')

const baseUrl = "https://api.twitch.tv/helix"

let token;

// authenticate
const authenticate = async function () {
  let authUrl = 'https://id.twitch.tv/oauth2/token'
  authUrl += `?client_id=${process.env.TWITCH_CLIENT_ID}`
  authUrl += `&client_secret=${process.env.TWITCH_CLIENT_SECRET}`
  authUrl += '&grant_type=client_credentials'
  let opts = {
    url: authUrl,
    method: "post"
  }

  try {
    let response = await axios(opts)
    token = {
      access_token: response.data.access_token,
      expiry: Date.now() + (response.data.expires_in * 1000)
    }
  } catch (err) {
    console.error("twitchService.authenticate", err)
    // TODO: Handle me
  }
}

// get token
const getToken = async function() {
  if(!token || token.expiry < Date.now()) {
    await authenticate()
  }
  return token.access_token
}

exports.getUserInfo = async function (userLogin) {
  let token = await getToken();
  let opts = {
    url: `${baseUrl}/users?login=${userLogin}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-ID': process.env.TWITCH_CLIENT_ID
    }
  }

  try {
    let response = await axios(opts)
    return response.data.data[0];
  } catch (err) {
    console.error("twitchService.getUserInfo", err)
    // TODO: Handle me
  }
}

// subscribe to user
exports.subscribeToUser = async function (userLogin, discordUserId) {
  let { id: userId } = await getUserInfo(userLogin)
  let token = await getToken();
  let body = {
    "hub.callback": process.env.TWITCH_SUB_CALLBACK_URL,
    "hub.mode": "subscribe",
    "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    "hub.lease_seconds": 864000 // in seconds
  }
  let opts = {
    url: `${baseUrl}/user?login=${userLogin}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-ID': process.env.TWITCH_CLIENT_ID
    },
    data: JSON.stringify(body)
  }

  try {
    let response = await axios(opts)
    return response.data;
  } catch (err) {
    console.error("twitchService.subscribeToUser", err)
    // TODO: Handle me
  }
}

exports.unsubscribeFromUser = async function (userLogin) {
  let { id: userId } = await getUserInfo(userLogin)
  let token = await getToken();
  let body = {
    "hub.callback": process.env.TWITCH_SUB_CALLBACK_URL,
    "hub.mode": "unsubscribe",
    "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    "hub.lease_seconds": 0 // in seconds
  }
  let opts = {
    url: `${baseUrl}/user?login=${userLogin}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-ID': process.env.TWITCH_CLIENT_ID
    },
    data: JSON.stringify(body)
  }

  try {
    let response = await axios(opts)
    return response.data;
  } catch (err) {
    console.error("twitchService.unsubscribeFromUser", err)
    // TODO: Handle me
  }
}