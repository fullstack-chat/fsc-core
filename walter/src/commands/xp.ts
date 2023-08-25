import { getInstance } from "../container"
import { Command } from "../models/command"
import  XpManager from "../managers/xp_manager"

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

export const xp: Command = {
  command: 'xp',
  isEnabled: true,
  helpText,
  fn: async msg => {
    const xpManager = getInstance(XpManager.name)
    let currentXp = xpManager.getXpForUserId(msg.author.id)
    if(currentXp) {
      let currentLevel = xpManager.getLevelForUserId(msg.author.id)
      msg.reply(`You are level ${currentLevel} with ${currentXp}xp!`)
    } else {
      msg.reply("I cant find you :(")
    }
  }
}