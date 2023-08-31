import { getInstance } from "../container";
import ScheduledJob from "../models/scheduled_job";

const log = getInstance("logger")

export const helloWorldJob: ScheduledJob = {
  name: "HelloWorld",
  cron: "* * * * *" ,
  execute: () => {
    log.info("hello world!")
  },
}

