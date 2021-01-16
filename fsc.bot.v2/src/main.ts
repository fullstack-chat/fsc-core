import { Bot, BotOptions } from '@victorbotjs/core'
import HelloWorldCommand from '@victorbotjs/command-hello-world'

import DadJokeCommand from './commands/DadJokeCommand'

async function onReady() {
  console.log('Hello bot!')
}

const options: BotOptions = {
  discordBotConfig: {
    prefix: "!fsc",
    token: "NzQwMjA2MTQzODE2NzI4NjE5.XylosQ.-GtgkRFD1Te7HrHGsRz_7_3j9y4"
  },
  onReady
}

const fscBot = new Bot(options)

// fscBot.addCommand(new HelloWorldCommand())
fscBot.addCommand(new DadJokeCommand())

fscBot.run()