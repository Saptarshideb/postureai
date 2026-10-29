import { create } from "zustand"

interface Metrics {
  neck_angle_deg: number
  lumbar_angle_deg: number
  shoulder_tilt_deg: number
  posture_score: number
}

interface PostureState {
  currentMetrics: Metrics | null

  landmarks: any[] | null

  setMetrics: (metrics: Metrics) => void

  setLandmarks: (landmarks: any[]) => void
}

export const usePostureStore = create<PostureState>((set) => ({
  currentMetrics: null,

  landmarks: null,

  setMetrics: (metrics) =>
    set({
      currentMetrics: metrics
    }),

  setLandmarks: (landmarks) =>
    set({
      landmarks
    })
}))