const security = require('../security')
const xpService = require('../services/xpService')
const { rng } = require('../helpers')

const minimumLevel = 5

module.exports = {
  command: 'giveaway',
  isEnabled: true,
  shouldCleanup: true,
  fn: async msg => {
    let args = msg.content.split(' ')
    
    if(args[2] === 'select-winner') {
      let isMod = await security.isMod(msg, msg.author.id)
      if(isMod) {
        // Get users above level 5
        let eligibleUsers = xpService.getUsersAtOrAboveXp(157)
        
        //TODO: Figure out a way to dynamically get mod names automatically 
        eligibleUsers = eligibleUsers.filter(el => el !== 'brianmm02' && el !== 'Diamond')

        let winnerIdx = rng(0, eligibleUsers.length)
        msg.channel.send(`Selected giveaway winner is **${eligibleUsers[winnerIdx]}**`)
      } else {
        msg.author.send("You are not permitted to use the '!fsc giveaway select-winner' command..")
      }
    }

  }
}