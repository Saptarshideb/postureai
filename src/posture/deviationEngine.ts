import { BaselinePosture } from "@/types/posture"

export function computeDeviation(
  baseline: BaselinePosture,
  current: {
    neck: number
    lumbar: number
  }
) {
  return {
    neck_deviation: current.neck - baseline.neck_angle_deg,
    lumbar_deviation: current.lumbar - baseline.lumbar_angle_deg
  }
}