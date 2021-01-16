const security = require('../security')
const portfolioService = require('../services/portfolioService')

const helpText = `
  Command: portfolio
  Description: Used to update the managed portfolios message for the server. The managed message is updated automatically by fsc.bot.
  Subcommands: 
    - Subcommand: add
      Description: Allows a member to add or update their portfolio item. Each member is allowed one entry.
      Examples:
        - Input: !fsc portfolio add https://brianmorrison.me
          Output: None directly. Will add or update the members portfolio site in the list.
    - Subcommand: init
      Description: Allows admins to initialize a new managed portfolios message in the current channel.
      Examples:
        - Input: !fsc portfolio init
          Output: **Member Portfolios:** (This is the start of the managed message.)
`

module.exports = {
  command: 'portfolio',
  isEnabled: true,
  helpText,
  shouldCleanup: true,
  fn: async msg => {
    let args = msg.content.split(' ')
    if(args[2] === 'add') {
      if(args.length < 4) {
        msg.author.send("Please provide a url to add to the portfolio list. Format should be `!fsc portfolio add https://brianmorrison.me`");
      } else {
        await portfolioService.updatePortfolios(msg, msg.author.username, args[3])
      }
    }
    
    if(args[2] === 'init') {
      let isMod = await security.isMod(msg, msg.author.id)
      if(isMod) {
        await portfolioService.initMessage(msg);
      } else {
        msg.author.send("You are not permitted to use the '!fsc portfolio init' command..")
      }
    }
  }
}