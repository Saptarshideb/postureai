// src/posture/samplingEngine.ts

import { PosturePacket } from "@/types/posture"

export class SamplingEngine {
  private intervalMs: number
  private lastEmitTime: number = 0

  constructor(intervalMs: number = 500) {
    this.intervalMs = intervalMs
  }

  shouldEmit(): boolean {
    const now = Date.now()

    if (now - this.lastEmitTime >= this.intervalMs) {
      this.lastEmitTime = now
      return true
    }

    return false
  }

  createPacket(metrics: {
    neck_angle_deg: number
    lumbar_angle_deg: number
    shoulder_tilt_deg: number
    posture_score: number
  }): PosturePacket {
    return {
      schema_version: "1.0",
      scoring_version: "1.0",
      timestamp: Date.now(),
      metrics
    }
  }

  reset() {
    this.lastEmitTime = 0
  }
}