import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getInstance } from "../container";
import XpManager from "../managers/xp_manager";
import SlashCommand from "../models/slash_command";
import SlashCommandManager from "../managers/slash_manager";

const helpText = `
  Command: xp
  Description: The 'xp' command can be used to fetch the users current Xp.
  Subcommands: none
  Examples:
    - Input: !fsc xp
      Output: @brianmmdev You are level 15 with 1445xp
`

export const xp: SlashCommand = {
  name: "xp",
  helpText,
  builder: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Returns your current XP and level"),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()
    const manager = getInstance(SlashCommandManager.name)
    const helpText = manager.getHelpText()
    await interaction.user.send(helpText)
  },
};
