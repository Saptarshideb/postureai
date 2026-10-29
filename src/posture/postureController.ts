

import { PoseEngine } from "./poseEngine"
import { calculateMetrics } from "./metricEngine"
import { SmoothingEngine } from "./smoothingEngine"
import { SamplingEngine } from "./samplingEngine"
import { calculatePostureScore } from "./scoringEngine"
import { db } from "@/storage/db"
import { PosturePacket } from "@/types/posture"
import { usePostureStore } from "@/hooks/usePostureStore"

export class PostureController {
  private poseEngine: PoseEngine
  private smoothingEngine: SmoothingEngine
  private samplingEngine: SamplingEngine

  constructor(videoElement: HTMLVideoElement) {
    this.smoothingEngine = new SmoothingEngine(0.3)
    this.samplingEngine = new SamplingEngine(500)

    this.poseEngine = new PoseEngine(videoElement, this.handleLandmarks)
  }

  async init() {
    await this.poseEngine.init()
  }

  start() {
    this.poseEngine.start()
  }

  stop() {
    this.poseEngine.stop()
    this.smoothingEngine.reset()
    this.samplingEngine.reset()
  }

  private handleLandmarks = async (result: any) => {
  // Push landmarks to Zustand for overlay rendering
  if (
    result.landmarks &&
    result.landmarks.length > 0
  ) {
    usePostureStore
      .getState()
      .setLandmarks(result.landmarks[0])
  }

  const rawMetrics = calculateMetrics(result)

  if (!rawMetrics) return

  const smoothed =
    this.smoothingEngine.smooth(rawMetrics)

  const postureScore =
    calculatePostureScore(
      smoothed.neck_angle_deg,
      smoothed.lumbar_angle_deg,
      smoothed.shoulder_tilt_deg
    )

  if (!this.samplingEngine.shouldEmit()) return

  const packet: PosturePacket =
    this.samplingEngine.createPacket({
      ...smoothed,
      posture_score: postureScore
    })

  await db.posture_metrics.add(packet)

  usePostureStore.getState().setMetrics({
    ...smoothed,
    posture_score: postureScore
  })
}
}