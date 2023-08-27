import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getInstance } from "../container";
import XpManager from "../managers/xp_manager";
import SlashCommand from "../models/slash_command";

export const xp: SlashCommand = {
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
