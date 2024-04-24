import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../models/slash_command";
import { getRandomDailyDiscussionQuestion } from "../data/questions";

const helpText = `
  Command: dailydiscussion
  Description: Sends a daily discussion question to the general channel.
  Subcommands: none
  Examples:
    - Input: /dailydiscussion
      Output: @brianmmdev What is the meaning of life?
`

export const command: SlashCommand = {
  name: "xp",
  helpText,
  builder: new SlashCommandBuilder()
    .setName("dailydiscussion")
    .setDescription("Sends a daily discussion question to the general channel"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();
    const q = getRandomDailyDiscussionQuestion()
    return interaction.editReply(q)
  },
};

export default command
