import * as dotenv from "dotenv";
dotenv.config();

import nodeCron from "node-cron";
import { getRandomDailyDiscussionQuestion } from "./data/questions";
import { Cronitor } from "cronitor"


import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { CommandManager } from "./managers/command_manager";
import { sendModBroadcast } from "./security";
import { logger as log } from "./logger";

// Commands
import { xp } from "./slash/xp"
import { help } from "./slash/help"
import { joke } from "./slash/dadjoke"
import { leaderboard } from "./slash/leaderboard"
import dailyDiscussionCmd from "./jobs/discussion_question";

import XpManager from "./managers/xp_manager";
import { RegisteredNames, registerService } from "./container";
import SlashCommandManager from "./managers/slash_manager";
import ScheduledJobManager from "./managers/scheduled_job_manager";
import { helloWorldJob } from "./jobs/hello_world";
import { dailyDiscussion } from "./jobs/discussion_question";
import FaunaService from "./db/FaunaService";

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ],
});

registerService(client, RegisteredNames.DiscordClient)
registerService(log, "logger")

const slashCommandManager = new SlashCommandManager(log);
registerService(slashCommandManager)

const scheduler = new ScheduledJobManager()

let xpManager: XpManager;

client.on(Events.ClientReady, async () => {
  try {
    if (process.env.IS_XP_ENABLED) {
      let fauna = new FaunaService(process.env.FAUNA_SECRET!, "");
      xpManager = new XpManager(log, fauna);
      await xpManager.init();
      registerService(xpManager);
    }

    // Register scheduled jobs
    scheduler.registerJob(helloWorldJob)
    scheduler.registerJob(dailyDiscussion)

    // Register slash commands
    slashCommandManager.addCommand(xp)
    slashCommandManager.addCommand(help);
    slashCommandManager.addCommand(joke);
    slashCommandManager.addCommand(leaderboard);
    slashCommandManager.addCommand(dailyDiscussionCmd);
    slashCommandManager.registerCommands();

    log.info("=====")
    log.info("Registered slash commands:");
    Object.keys(slashCommandManager.commands).forEach(c => log.info(c));
    log.info("=====")
    log.info("Registered jobs:");
    Object.keys(scheduler.jobs).forEach(c => log.info(`${c} (${scheduler.jobs[c].cron})`));
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
});

client.login(process.env.BOT_TOKEN);

const cronitor = new Cronitor(process.env.CRONITOR_KEY as string)
cronitor.wraps(nodeCron)
cronitor.schedule("fsc-motd", "0 8 * * *", async () => {
  const q = getRandomDailyDiscussionQuestion()

  const channelId = process.env.GENERAL_CHANNEL_ID as string;
  const channel = await client.channels.fetch(channelId)

  //@ts-ignore
  await channel.send(q)
})