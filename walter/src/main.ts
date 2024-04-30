import * as dotenv from "dotenv";
dotenv.config();

import nodeCron from "node-cron";
import { getRandomDailyDiscussionQuestion } from "./data/questions";
import { Cronitor } from "cronitor"


import { ChannelType, Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { isSenderPatron, sendModBroadcast } from "./security";
import { logger as log } from "./logger";

// Commands
import { xp } from "./slash/xp"
import { help } from "./slash/help"
import { joke } from "./slash/dadjoke"
import { leaderboard } from "./slash/leaderboard"
import { img } from "./slash/img"
import dailyDiscussionCmd from "./slash/discussionQuestion";

import XpManager from "./managers/xp_manager";
import { RegisteredNames, registerService } from "./container";
import SlashCommandManager from "./managers/slash_manager";
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

let xpManager: XpManager;

client.on(Events.ClientReady, async () => {
  try {
    if (process.env.IS_XP_ENABLED) {
      let fauna = new FaunaService(process.env.FAUNA_SECRET!, "");
      xpManager = new XpManager(log, fauna);
      await xpManager.init();
      registerService(xpManager);
    }

    // Register slash commands
    slashCommandManager.addCommand(xp)
    slashCommandManager.addCommand(help);
    slashCommandManager.addCommand(joke);
    slashCommandManager.addCommand(leaderboard);
    slashCommandManager.addCommand(dailyDiscussionCmd);
    slashCommandManager.addCommand(img);
    slashCommandManager.registerCommands();

    log.info("=====")
    log.info("Registered slash commands:");
    Object.keys(slashCommandManager.commands).forEach(c => log.info(c));
    log.info("=====")
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

  const tag = `<@${client.user!.id}>`

  // Someone has mentioned the bot
  if(message.mentions.has(client.user!.id) &&
    (message.content.startsWith(tag) || message.content.endsWith(tag))) {
    // Check if the user has the Patron role, DM them if not
    if(!isSenderPatron(message)) {
      await message.author.send("Sorry, I can't do that for you. Become a patron to unlock this feature!");
      await message.delete()
    } else {
      // Remove the mention from the message
      let msg = message.content.replace(tag, "").trim();
      // Show a typing indicator
      await message.channel.sendTyping();
      // Send the message to the Ollama API
      let res = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: msg,
          model: "llama3",
          stream: false
        })
      })
      let data = await res.json();
      const response = data.response.trim();
      if(response.length > 1500) {
        let destination = message.channel;
        // Create a thread ONLY if were not in one already
        if(message.channel.type === ChannelType.GuildText) {
          let threadname = `"${msg.length > 50 ? msg : `${msg.slice(0, 70)}...`}" by @${message.author.username}`
          destination = await message.startThread({
            name: threadname,
            autoArchiveDuration: 1440
          })
        }
        let spl = response.split("\n");
        let isWritingCodeBlock = false
        let agg = ""
        for(const chunk of spl) {
          await destination.sendTyping();
          if(chunk !== "") {
            if(chunk.startsWith("```")) {
              isWritingCodeBlock = !isWritingCodeBlock
            }
            agg += `${chunk}\n`
            if(!isWritingCodeBlock)  {
              await destination.send(agg)
              agg = ""
            }
          }
        }
      } else {
        // Send the response to the user
        await message.reply(data.response.trim());
      }
    }
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