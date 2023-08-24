
import * as dotenv from 'dotenv'
dotenv.config();

import { Client, Events, GatewayIntentBits }  from 'discord.js'
import { CommandManager } from './models';

// Commands
import { dadJoke } from './commands/dadjoke'

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ]
});

// const xpService = require('./services/xpService')
// const portfolioService = require('./services/portfolioService')
// const security = require('./security')
const { logger: log } = require('./logger')

let commandManager = new CommandManager(log)
const prefix = process.env.PREFIX || "!w"

client.on("ready", async () => {
  try {
    // if (process.env.IS_XP_ENABLED) {
    //   await xpService.init()
    // }
    commandManager.registerCommand(dadJoke)

    log.info('Registered commands are:\n')
    Object.keys(commandManager.commands).forEach(c => log.info(c))
  } catch (err) {
    log.error("Init failed:", err)
  }
    
  log.info(`${client?.user?.username} is ready!`)
});

client.on("error", (e) => {
  log.info(`${client?.user?.username} borked: ${e}`);
});

// client.on('guildMemberAdd', async member => {
//   await security.sendModBroadcast(member.guild, `**${member.user.username}** just joined **${member.guild.name}**!`)
// });

client.on(Events.MessageCreate, async (message) => {
  if(message.author.bot) {
    return;
  }

  // if(process.env.IS_XP_ENABLED) {
  //   xpService.logXp(message, message.author.id, message.author.username)
  // }

  if(message.content.startsWith(prefix)) {
    await commandManager.handleMessage(message)
  }
});

client.login(process.env.BOT_TOKEN);