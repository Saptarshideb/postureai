import { PostureMetrics } from "@/types/posture"

export const SCORING_VERSION = "1.0"

export function calculatePostureScore(
  neck: number,
  lumbar: number,
  shoulder: number
): number {
  const score =
    100
    - 1.3 * Math.abs(neck)
    - 1.8 * Math.abs(lumbar)
    - 0.8 * Math.abs(shoulder)

  return Math.max(0, Math.min(100, score))
}