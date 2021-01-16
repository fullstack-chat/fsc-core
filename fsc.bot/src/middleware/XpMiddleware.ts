import { IMiddleware } from "@victorbotjs/core";
import { Message } from "discord.js";
import { logXp } from "../services/XpService"

class XpMiddleware implements IMiddleware {
  exec(message: Message): void {
    logXp(message, message.author.id, message.author.username)
  }
}

export default XpMiddleware