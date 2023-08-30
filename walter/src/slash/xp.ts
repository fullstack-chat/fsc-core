import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getInstance } from "../container";
import XpManager from "../managers/xp_manager";
import SlashCommand from "../models/slash_command";

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: /xp
      Output: @brianmmdev You are level 15 with 1445xp
`

export const xp: SlashCommand = {
  name: "xp",
  helpText,
  builder: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Returns your current XP and level"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();
    
    const xpManager = getInstance(XpManager.name)
    let currentXp = xpManager.getXpForUserId(interaction.user.id)
    if(currentXp) {
      let currentLevel = xpManager.getLevelForUserId(interaction.user.id)
      return interaction.editReply(`You are level ${currentLevel} with ${currentXp}xp!`)
    } else {
      return interaction.editReply("I cant find you :(")
    }
  },
};
