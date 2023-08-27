import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

type SlashCommand = {
  builder: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction) => void
}

export default SlashCommand