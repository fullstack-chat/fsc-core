import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export enum SlashCommandOptionType {
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8
}

export type SlashCommandOptions = {
  name: string
  description: string
  required: boolean
  type: SlashCommandOptionType
}

type SlashCommand = {
  name: string
  helpText?: string
  builder: SlashCommandBuilder
  options?: SlashCommandOptions[]
  execute: (interaction: ChatInputCommandInteraction) => void
}

export default SlashCommand