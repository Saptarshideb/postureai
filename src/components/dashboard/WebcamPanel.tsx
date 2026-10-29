"use client"

import { useEffect, useRef } from "react"
import { PostureController } from "@/posture/postureController"
import PoseOverlay from "./PoseOverlay"

export default function WebcamPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controllerRef = useRef<PostureController | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        console.log("Requesting camera...")

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })

        console.log("Camera stream acquired:", stream)

        streamRef.current = stream

        if (!videoRef.current) return

        videoRef.current.srcObject = stream

        await videoRef.current.play()

        console.log("Video playing")

        controllerRef.current = new PostureController(videoRef.current)

        await controllerRef.current.init()

        controllerRef.current.start()

        console.log("Posture controller started")
      } catch (err) {
        console.error("Camera initialization failed:", err)
      }
    }

    init()

    return () => {
      controllerRef.current?.stop()

      streamRef.current?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [])

  return (
  <div className="relative w-full rounded-xl overflow-hidden bg-black">
    <video
      ref={videoRef}
      className="w-full h-auto"
      autoPlay
      playsInline
      muted
    />

    <PoseOverlay />
  </div>
)
}