import { Context, DiscordCommandBase } from "@victorbotjs/core"
import Discord from "discord.js"

import { getXpForUserId, getLevelForUserId } from './XpService'

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

class XPCommand extends DiscordCommandBase {
  config = {
    commandText: "xp"
  }

  async exec(context: Context): Promise<void> {
    const message = context.message as Discord.Message
    let currentXp = await getXpForUserId(context, message.author.id)
    if(currentXp) {
      let currentLevel = await getLevelForUserId(context, message.author.id)
      message.reply(`You are level ${currentLevel} with ${currentXp}xp`)
    } else {
      message.reply("I cant find you :(")
    }
  }
}

export default XPCommand