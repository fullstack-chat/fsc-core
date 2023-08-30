import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

type SlashCommand = {
  name: string
  helpText?: string
  builder: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction) => void
}

export default SlashCommand