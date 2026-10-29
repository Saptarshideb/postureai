// src/posture/smoothingEngine.ts

interface SmoothedMetrics {
  neck_angle_deg: number
  lumbar_angle_deg: number
  shoulder_tilt_deg: number
}

export class SmoothingEngine {
  private alpha: number
  private previous: SmoothedMetrics | null = null

  constructor(alpha: number = 0.3) {
    this.alpha = alpha
  }

  smooth(current: SmoothedMetrics): SmoothedMetrics {
    if (!this.previous) {
      this.previous = current
      return current
    }

    const smoothed: SmoothedMetrics = {
      neck_angle_deg:
        this.alpha * current.neck_angle_deg +
        (1 - this.alpha) * this.previous.neck_angle_deg,

      lumbar_angle_deg:
        this.alpha * current.lumbar_angle_deg +
        (1 - this.alpha) * this.previous.lumbar_angle_deg,

      shoulder_tilt_deg:
        this.alpha * current.shoulder_tilt_deg +
        (1 - this.alpha) * this.previous.shoulder_tilt_deg
    }

    this.previous = smoothed
    return smoothed
  }

  reset() {
    this.previous = null
  }
}