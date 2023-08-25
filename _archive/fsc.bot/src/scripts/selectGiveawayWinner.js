const xpService = require('../services/xpService')
const discordMessageService = require('../services/discordMessageService')

const minimumLevel = 5

module.exports = {
  enabled: process.env.SELECT_GIVEAWAY_WINNER_ENABLED === "true",
  schedule:  "0 0 1 * *",
  fn: async function () {
    // get all users above level
    
  }
}