import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits, Interaction, REST, Routes } from "discord.js";
import { CommandManager } from "./managers/command_manager";
import { sendModBroadcast } from "./security";
import { logger as log } from "./logger";

// Commands
import { dadJoke } from "./commands/dadjoke";
import { xp } from "./slash/xp"
import { help } from "./slash/help"
import { joke } from "./slash/dadjoke"
import XpManager from "./managers/xp_manager";
import { registerService } from "./container";
import SlashCommandManager from "./managers/slash_manager";

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildModeration
  ],
});

let commandManager = new CommandManager(log);
let slashCommandManager = new SlashCommandManager(log);
let xpManager: XpManager;

const prefix = process.env.PREFIX || "!w";

client.on(Events.ClientReady, async () => {
  try {
    if (process.env.IS_XP_ENABLED) {
      xpManager = new XpManager(log);
      await xpManager.init();

      registerService(xpManager);
      registerService(slashCommandManager)
    }

    // Register standard commands
    commandManager.registerCommand(dadJoke);

    // Register slash commands
    slashCommandManager.addCommand(xp)
    slashCommandManager.addCommand(help);
    slashCommandManager.addCommand(joke);
    slashCommandManager.registerCommands();

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
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await slashCommandManager.handleCommand(interaction)
});

// Standard messages
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
