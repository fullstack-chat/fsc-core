import { RegisteredNames, getInstance } from "../container";
import ScheduledJob from "../models/scheduled_job";
import { TextChannel } from 'discord.js';
import { conversationQuestions } from "../data/questions";

const client = getInstance(RegisteredNames.DiscordClient);
const log = getInstance("logger")
const generalChannelId = "553773331674038284"
const fscDevChannelId = "770277975672225834"

export const dailyDiscussion: ScheduledJob = {
  name: "DiscussionQuestion",
  cron: "* * * * *" ,
  execute: () => {
    const theQuestion = conversationQuestions[Math.floor(Math.random()*conversationQuestions.length)];
    log.info("Sending", theQuestion)
    (client.channels.cache.get(fscDevChannelId) as TextChannel).send(`Question of the day: ${theQuestion}`);
  },
}

