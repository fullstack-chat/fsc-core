import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getInstance } from "../container";
import XpManager from "../managers/xp_manager";
import SlashCommand from "../models/slash_command";
import SlashCommandManager from "../managers/slash_manager";

export const help: SlashCommand = {
  name: "help",
  builder: new SlashCommandBuilder()
    .setName("help")
    .setDescription("DMs a message to you with help on all available commands"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const manager = getInstance(SlashCommandManager.name)
    const helpText = manager.getHelpText()
    await interaction.user.send(helpText)
  },
};
