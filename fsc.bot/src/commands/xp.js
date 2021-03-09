const xpService = require('../services/xpService')

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

module.exports = {
  command: 'xp',
  isEnabled: true,
  helpText,
  fn: async msg => {
    let currentXp = xpService.getXpForUserId(msg.author.id)
    if(currentXp) {
      let currentLevel = xpService.getLevelForUserId(msg.author.id)
      msg.reply(`You are level ${currentLevel} with ${currentXp}xp`)
    } else {
      msg.reply("I cant find you :(")
    }
  }
}