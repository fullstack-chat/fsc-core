import { Bot, BotOptions } from '@victorbotjs/core'

// Setup env vars
// @ts-ignore
import * as customEnv from 'custom-env' //require('custom-env').env(true)
customEnv.env(true)

// Commands
import XpCommand from './commands/XpCommand'

// Middleware
import XpMiddleware from './middleware/XpMiddleware'

const opts: BotOptions = {
  discordBotConfig: {
    prefix: "!fsc",
    token: process.env.BOT_TOKEN as string
  }
}

const bot = new Bot(opts)

console.log(process.env.BOT_TOKEN)

bot.addCommand(new XpCommand())
bot.use(new XpMiddleware())

bot.run()