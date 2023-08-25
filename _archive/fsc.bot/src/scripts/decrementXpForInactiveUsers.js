const xpService = require('../services/xpService')

module.exports = {
  enabled: process.env.DECREMENT_XP_SCRIPT_ENABLED === "true",
  schedule:  "0 * * * *", // https://crontab.guru/every-1-hour
  fn: xpService.processDecrementXpScript
}