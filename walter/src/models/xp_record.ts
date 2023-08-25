export type XpRecordProps = {
  currentXp: number
  lastAppliedTimestamp: number
  multiplier: number
  username: string
  penaltyCount: number
}

export default class XpRecord {
  currentXp: number
  lastAppliedTimestamp: number
  multiplier: number
  username: string
  penaltyCount: number

  constructor(props: XpRecordProps) {
    this.currentXp = props.currentXp
    this.lastAppliedTimestamp = props.lastAppliedTimestamp
    this.multiplier = props.multiplier
    this.username = props.username
    this.penaltyCount = props.penaltyCount
  }
}
