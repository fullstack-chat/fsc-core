const axios = require('axios');
const FaunaService = require('@brianmmdev/faunaservice')
const Discord = require('discord.js')

const fscGuildId = '553773331674038282'

const permittedRoleIds = [
  '797934903584620635',
  '770687332701044747'
]

async function updateRoles(userId, selectedRoles) {
  const client = new Discord.Client()
  client.on("error", () => client.destroy())
  await client.login(process.env.BOT_TOKEN)

  const guild = client.guilds.cache.find(el => el.id === fscGuildId)

  let member = await guild.members.fetch(userId)
  console.log('member', member)

  let rolesToRemove = []
  let rolesToAdd = []

  permittedRoleIds.forEach(roleId => {
    if(selectedRoles.includes(roleId)) {
      rolesToAdd.push(roleId)
    } else {
      rolesToRemove.push(roleId)
    }
  })

  console.log('adding roles', rolesToAdd)
  console.log('removing roles', rolesToRemove)

  if(rolesToRemove.length > 0) {
    member = await member.roles.remove(rolesToRemove)
  }

  if(rolesToAdd.length > 0) {
    member = await member.roles.add(rolesToAdd)
  }

  console.log('member after', member)

  client.destroy()
}

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

  console.log(body)

  let token = event.headers['authorization'].split(' ')[1]
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
  let currentRecord = await faunaService.getRecordByIndex('profilesByUserId', userId)
  if(!currentRecord) {
    await faunaService.createRecord('profiles', {
      userId,
      document: body
    })
    response = {
      statusCode: 201
    }
  } else {
    await faunaService.updateRecord('profiles', currentRecord.id, {
      userId,
      document: body
    })
    response = {
      statusCode: 200
    }
  }

  await updateRoles(userId, body.pingRoles)

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