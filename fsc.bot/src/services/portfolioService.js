const messageService = require('./discordMessageService')
const tableService = require('./azureTableService')

const dataRowKey = 'portfolios'
let data = {}

const configRowKey = 'portfoliosConfig'
let config = {}

const messageHeader = 'Member Portfolios'

exports.init = async function () {
  data = await tableService.fetch(dataRowKey, data);
  config = await tableService.fetch(configRowKey, config)
}

const saveData = async function () {
  await tableService.save(dataRowKey, data)
}

const saveConfig = async function () {
  await tableService.save(configRowKey, config)
}

const setMessageId = async function (newMessageId) {
  config.messageId = newMessageId;
  await saveConfig();
}

exports.initMessage = async function (message) {
  let postedMessage = await message.channel.send(`${messageHeader}:`)
  await postedMessage.suppressEmbeds(true)
  await setMessageId(postedMessage.id)
}

exports.updatePortfolios = async function (message, username, portfolioUrl) {
  data[message.author.id] = {
    username,
    portfolioUrl
  }
  
  let sorted = []
  Object.keys(data).forEach(key => {
    sorted.push({
      userId: key,
      username: data[key].username,
      portfolioUrl: data[key].portfolioUrl
    })
  })
  
  sorted = sorted.sort(compare)
  
  let messageContent = `${messageHeader}:\n`
  sorted.forEach(el => {
    messageContent += `• **${el.username}**: ${el.portfolioUrl}\n`
  })

  // Update message
  try {
    await messageService.updateMessageContent(message, config.messageId, messageContent)
    await saveData()
  } catch (err) {
    console.error("ERROR: ", err)
  }
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const usernameA = a.username.toUpperCase();
  const usernameB = b.username.toUpperCase();

  let comparison = 0;
  if (usernameA > usernameB) {
    comparison = 1;
  } else if (usernameA < usernameB) {
    comparison = -1;
  }
  return comparison;
}

