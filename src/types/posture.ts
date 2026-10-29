export interface PostureMetrics {
  neck_angle_deg: number
  lumbar_angle_deg: number
  shoulder_tilt_deg: number
  posture_score: number
}

export interface PosturePacket {
  schema_version: string
  scoring_version: string
  timestamp: number
  metrics: PostureMetrics
}

export interface BaselinePosture {
  neck_angle_deg: number
  lumbar_angle_deg: number
  shoulder_tilt_deg: number
  posture_score: number
  created_at: number
}