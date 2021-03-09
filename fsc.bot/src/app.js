require('custom-env').env(true)
const http = require('http');
const Discord = require("discord.js");
const client = new Discord.Client();
const scheduler = require('@brianmmdev/script-scheduler')

const azureTableService = require('./services/azureTableService')
const xpService = require('./services/xpService')
const portfolioService = require('./services/portfolioService')
const security = require('./security')
const { parseCommands } = require('./helpers')

let commands = {}

client.on("ready", async () => {
  try {
    await azureTableService.init()
    await xpService.init()
    await portfolioService.init()
    commands = await parseCommands('./src/commands')
  } catch (err) {
    console.error("Init failed:", err)
  }
  console.log(`${client.user.username} is ready!`)
});

client.on("error", (e) => {
  console.log(`${client.user.username} borked: ${e}`);
});

client.on('guildMemberAdd', async member => {
  await security.sendModBroadcast(member.guild, `**${member.user.username}** just joined **${member.guild.name}**!`)
});

client.on("message", async (message) => {
  if(message.author.bot) {
    return;
  }
  
  if(process.env.IS_XP_ENABLED !== "false") {
    xpService.logXp(message, message.author.id, message.author.username)
  }

  if(message.content.startsWith(process.env.PREFIX)) {
    const cmd = message.content.split(' ')[1];

    // Handle global `help` cmd
    if(cmd && cmd.toLowerCase() === 'help') {
      let helpResponse = "**fsc.bot Help**\n'!fsc' is used to call fsc.bot, followed by one of these commands:\n\n"
      Object.keys(commands).forEach(c => {
        if(commands[c].helpText) {
          helpResponse += `**!fsc ${commands[c].command}:**`
          helpResponse += '\n```yaml'
          helpResponse += `${commands[c].helpText}\n`
          helpResponse += '```\n'
        }
      })
      
      await message.author.send(helpResponse)
      await message.delete()
      return;
    }

    // Return on unknown commands
    if (commands[cmd] === undefined) {
      console.log('Unable to find command', cmd)
      return
    }

    // Handle command-based help
    const subCommand = message.content.split(' ')[2]
    if(subCommand && subCommand.toLowerCase() === 'help') {
      if(commands[cmd].helpText) {
        let helpResponse = `**!fsc ${commands[cmd].command} help:**`
        helpResponse += '\n```yaml'
        helpResponse += `${commands[cmd].helpText}\n`
        helpResponse += '```\n'
        await message.author.send(helpResponse)
        await message.delete()
        return
      }
    }

    // Handle command
    await commands[cmd].fn(message);

    if(commands[cmd].shouldCleanup) {
      await message.delete()
    }
  }
});

client.login(process.env.BOT_TOKEN);

// Setup scheduled scripts
const baseDir = `${__dirname}/scripts/`
scheduler.run(baseDir)

// Bind to PORT for keepalive in Heroku
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('ok');
  res.end();
}).listen(process.env.PORT || 8080);