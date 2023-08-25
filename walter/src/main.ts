import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits, Interaction, REST, Routes } from "discord.js";
import { CommandManager } from "./managers/command_manager";
import { sendModBroadcast } from "./security";
import { logger as log } from "./logger";

// import { commandsList, registerSlashCommands } from "./managers/slash_manager";

// Commands
import { dadJoke } from "./commands/dadjoke";
import { xp } from "./commands/xp";
import XpManager from "./managers/xp_manager";
import { registerService } from "./container";

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration],
});

let commandManager = new CommandManager(log);
let xpManager: XpManager;

// Construct and prepare an instance of the REST module
// const rest = new REST().setToken(process.env.BOT_TOKEN!);
// (async () => {
//   try {
//     const slashCommands = await registerSlashCommands();

//     await rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID!, process.env.GUILD_ID!), { body: slashCommands.map(i => i.data) });
//     console.log(`Registered slash commands`, slashCommands);
//   } catch (error) {
//     console.error(error);
//   }
// })();

const prefix = process.env.PREFIX || "!w";

client.on(Events.ClientReady, async () => {
  try {
    if (process.env.IS_XP_ENABLED) {
      xpManager = new XpManager(log);
      await xpManager.init();

      registerService(xpManager);
    }

    // Register commands
    commandManager.registerCommand(dadJoke);
    commandManager.registerCommand(xp);

    log.info("Registered commands are:\n");
    Object.keys(commandManager.commands).forEach(c => log.info(c));
  } catch (err) {
    log.error("Init failed:", err);
  }

  log.info(`${client?.user?.username} is ready!`);
});

client.on(Events.Error, e => {
  log.info(`${client?.user?.username} borked: ${e}`);
});

client.on(Events.GuildMemberAdd, async member => {
  await sendModBroadcast(member.guild, `**${member.user.username}** just joined **${member.guild.name}**!`);
});

/** Slash Commands */
// client.on(Events.InteractionCreate, async (interaction: Interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   // @ts-ignore
//   const command = commandsList.find(i => i.data.name === interaction.commandName);

//   if (!command) {
//     console.error(`No command matching ${interaction.commandName} was found.`);
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     if (interaction.replied || interaction.deferred) {
//       await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
//     } else {
//       await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
//     }
//   }
// });

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) {
    return;
  }

  if (xpManager) {
    xpManager.logXp(message, message.author.id, message.author.username);
  }

  if (message.content.startsWith(prefix)) {
    await commandManager.handleMessage(message);
  }
});

client.login(process.env.BOT_TOKEN);
