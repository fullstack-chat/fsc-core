// Deps
import http from 'http'
import { Bot, BotOptions } from '@victorbotjs/core'

// Setup env vars
// @ts-ignore
import * as customEnv from 'custom-env'
customEnv.env(true)

// Commands
import XpCommand from './Plugins/XpPlugin/XpCommand'

// Middleware
import XpMiddleware from './Plugins/XpPlugin/XpMiddleware'

const opts: BotOptions = {
  discordBotConfig: {
    prefix: "!fsc",
    token: process.env.BOT_TOKEN as string
  }
}

const bot = new Bot(opts)

bot.addCommand(new XpCommand())
bot.use(new XpMiddleware())

bot.run()

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('ok');
  res.end();
}).listen(process.env.PORT || 8080);