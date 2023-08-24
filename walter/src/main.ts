
import * as dotenv from 'dotenv'
dotenv.config();

import { Client, Events, GatewayIntentBits }  from 'discord.js'
import { CommandManager } from './models';

// Commands
import { dadJoke } from './commands/dadjoke'

// require('custom-env').env(true)
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ]
});
// const scheduler = require('@brianmmdev/script-scheduler')

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
    //   // await portfolioService.init()
    // }
    // commands = await parseCommands('./src/commands')
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

client.on("message", async (message) => {
  console.log(message)
  if(message.author.bot) {
    return;
  }

  // if(process.env.IS_XP_ENABLED) {
  //   xpService.logXp(message, message.author.id, message.author.username)
  // }

  console.log(message.content)

  if(message.content.startsWith(prefix)) {
    // const cmd = message.content.split(' ')[1];

    // // Handle global `help` cmd
    // if(cmd && cmd.toLowerCase() === 'help') {
    //   await message.author.send(commandManager.getHelpText())
    //   await message.delete()
    //   return;
    // }

    await commandManager.handleMessage(message)

  

    // // Return on unknown commands
    // if (commands[cmd] === undefined) {
    //   log.info('Unable to find command', cmd)
    //   return
    // }

    // // Handle command-based help
    // const subCommand = message.content.split(' ')[2]
    // if(subCommand && subCommand.toLowerCase() === 'help') {
    //   if(commands[cmd].helpText) {
    //     let helpResponse = `**!w ${commands[cmd].command} help:**`
    //     helpResponse += '\n```yaml'
    //     helpResponse += `${commands[cmd].helpText}\n`
    //     helpResponse += '```\n'
    //     await message.author.send(helpResponse)
    //     await message.delete()
    //     return
    //   }
    // }

    // // Handle command
    // await commands[cmd].fn(message);

    // if(commands[cmd].shouldCleanup) {
    //   await message.delete()
    // }
  }
});

// client.on("guildMemberAdd")

client.login(process.env.BOT_TOKEN);

// Setup scheduled scripts
// const baseDir = `${__dirname}/scripts/`
// scheduler.run(baseDir)