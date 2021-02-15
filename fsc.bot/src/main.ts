// Deps
import http from 'http'
import { Bot, BotOptions } from '@victorbotjs/core'

// Setup env vars
// @ts-ignore
import * as customEnv from 'custom-env'
customEnv.env(true)

import FaunaDatastoreAdapter from './DatastoreAdapters/FaunaDatastoreAdapter'
import XpPlugin from './Plugins/XpPlugin/Index'

const opts: BotOptions = {
  discordBotConfig: {
    prefix: "!w",
    token: process.env.BOT_TOKEN as string
  }
}

const bot = new Bot(opts)

const dsa = new FaunaDatastoreAdapter(process.env.FAUNA_SECRET as string, "idxByKey", "fsc-bot-data")
bot.addDatastore(dsa)

bot.use(new XpPlugin())

bot.run()

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('ok');
  res.end();
}).listen(process.env.PORT || 8080);