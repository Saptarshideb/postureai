import Dexie, { Table } from "dexie"
import { BaselinePosture, PosturePacket } from "@/types/posture"

export class PostureDatabase extends Dexie {
  posture_metrics!: Table<PosturePacket>
  baseline_posture!: Table<BaselinePosture>

  constructor() {
    super("PostureAIDatabase")

    this.version(1).stores({
      posture_metrics: "++id, timestamp, scoring_version",
      baseline_posture: "++id, created_at"
    })
  }
}

export const db = new PostureDatabase()