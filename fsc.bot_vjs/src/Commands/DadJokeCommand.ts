import { Context, DiscordCommandBase } from "@victorbotjs/core"
import Discord from "discord.js"
import axios from "axios"

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

class DadJokeCommand extends DiscordCommandBase {
  config = {
    commandText: "joke"
  }

  async exec(context: Context): Promise<void> {
    const message = context.message as Discord.Message
    let res = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: 'application/json'
      }
    });
    const { joke } = res.data;
    message.reply(joke);
  }
}

export default DadJokeCommand