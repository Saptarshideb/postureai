
import {
  FilesetResolver,
  PoseLandmarker,
  PoseLandmarkerResult
} from "@mediapipe/tasks-vision"

export type LandmarkCallback = (result: PoseLandmarkerResult) => void

export class PoseEngine {
  private video: HTMLVideoElement
  private landmarker: PoseLandmarker | null = null
  private animationFrameId: number | null = null
  private onLandmarks: LandmarkCallback

  constructor(videoElement: HTMLVideoElement, callback: LandmarkCallback) {
    this.video = videoElement
    this.onLandmarks = callback
  }

  async init() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    )

    this.landmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task"
      },
      runningMode: "VIDEO",
      numPoses: 1
    })
  }

  start() {
  if (!this.landmarker) {
    throw new Error("PoseEngine not initialized")
  }

  const detectFrame = () => {
    if (!this.video || this.video.readyState < 2) {
      this.animationFrameId = requestAnimationFrame(detectFrame)
      return
    }

    // Debug information
    console.log(
      "Video:",
      this.video.videoWidth,
      this.video.videoHeight,
      this.video.readyState
    )

    try {
      const now = performance.now()

      const result = this.landmarker!.detectForVideo(
        this.video,
        now
      )

      if (result.landmarks?.length) {
        this.onLandmarks(result)
      }
    } catch (err) {
      console.error("DETECT ERROR:", err)
    }

    this.animationFrameId = requestAnimationFrame(detectFrame)
  }

  detectFrame()
}

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }
}