import { MiddlewareBase, Context } from "@victorbotjs/core";
import { logXp } from "./XpService"
import Discord from 'discord.js'

class XpMiddleware extends MiddlewareBase {
  exec(context: Context): void {
    const message = context.message as Discord.Message;
    logXp(context, message, message.author.id, message.author.username)
  }
}

export default XpMiddleware