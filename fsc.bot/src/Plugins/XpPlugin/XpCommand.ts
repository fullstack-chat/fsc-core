import { ICommand } from "@victorbotjs/core"
import DiscordCommandConfig from "@victorbotjs/core/dist/types/DiscordCommandConfig"
import { Message } from "discord.js"

import { getXpForUserId, getLevelForUserId } from './XpService'

// const xpService = require('../services/xpService')

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

// module.exports = {
//   command: 'xp',
//   isEnabled: true,
//   helpText,
//   fn: async msg => {
//   }
// }


class XPCommand implements ICommand {
  discordCommandConfig?: DiscordCommandConfig
  commandText: string = "xp"

  async exec(message: Message): Promise<void> {
    let currentXp = getXpForUserId(message.author.id)
    if(currentXp) {
      let currentLevel = getLevelForUserId(message.author.id)
      message.reply(`You are level ${currentLevel} with ${currentXp}xp`)
    } else {
      message.reply("I cant find you :(")
    }
  }
}

export default XPCommand