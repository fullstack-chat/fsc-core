import ScheduledJob from "../models/scheduled_job";
import * as cron from 'node-cron'

export default class ScheduledJobManager {
  jobs: {[key: string]: ScheduledJob} = {}

  registerJob(job: ScheduledJob) {
    this.jobs[job.name] = job
    cron.schedule(job.cron, job.execute, { name: job.name })
  }
}