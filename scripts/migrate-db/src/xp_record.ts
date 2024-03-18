export type XpRecordProps = {
  userId: string
  currentXp: number
  lastAppliedTimestamp: number
  multiplier: number
  username: string
  penaltyCount: number
}

export default class XpRecord {
  userId: string
  currentXp: number
  lastAppliedTimestamp: number
  multiplier: number
  username: string
  penaltyCount: number

  constructor(props: XpRecordProps) {
    this.userId = props.userId
    this.currentXp = props.currentXp
    this.lastAppliedTimestamp = props.lastAppliedTimestamp
    this.multiplier = props.multiplier
    this.username = props.username
    this.penaltyCount = props.penaltyCount
  }
}
