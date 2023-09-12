import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getInstance } from "../container";
import XpManager from "../managers/xp_manager";
import SlashCommand from "../models/slash_command";
import { XpRecordProps } from "../models/xp_record";

const helpText = `
  Command: Leaderboard
  Description: The 'leaderboard' command shows the top 10 users by XP.
  Subcommands: none
  Examples:
    - Input: /leaderboard
      Output: 1. @brianmmdev 2. @dmdboi
`;

export const leaderboard: SlashCommand = {
  name: "leaderboard",
  helpText,
  builder: new SlashCommandBuilder().setName("leaderboard").setDescription("Return the XP Leaderboard"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    try {
      await interaction.deferReply();

      const xpManager = getInstance(XpManager.name);

      let leaderboard: XpRecordProps[] = xpManager.getLeaderboardUsers();

      if (leaderboard) {
        let description = "";

        leaderboard.map((user, index) => {
          return description += `${index}. ${user.username} - ${user.currentXp}\n`;
        });

        const embed = new EmbedBuilder().setColor(0x0099ff).setTitle("XP Leaderboard").setDescription(`${description}`).setTimestamp();

        return interaction.editReply({ embeds: [embed] });
      } else {
        return interaction.editReply("I cant find you :(");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
