export type Command = {
  // The command that will be used in the server
  command: string

  // If not true, the bot will not parse this command
  isEnabled: boolean

  // The help text for the command when `!w help` is used
  helpText: string

  // TODO: type this
  // The callback that handles the command
  fn: (...args: any[]) => void

  // If true, the message posted by the user will be removed when the command runs
  shouldCleanup?: boolean
}