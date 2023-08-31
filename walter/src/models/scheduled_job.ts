type ScheduledJob = {
  name: string
  cron: string
  execute: (now: Date | "manual" | "init") => void
}

export default ScheduledJob