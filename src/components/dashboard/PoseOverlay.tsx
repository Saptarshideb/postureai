"use client"

import { useEffect, useRef } from "react"
import { usePostureStore } from "@/hooks/usePostureStore"

export default function PoseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const landmarks = usePostureStore(
    (state) => state.landmarks
  )

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas || !landmarks) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    )

    const drawPoint = (
      x: number,
      y: number
    ) => {
      ctx.beginPath()
      ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
      )

      ctx.fillStyle = "#00ff88"
      ctx.fill()
    }

    const drawLine = (
      p1: any,
      p2: any
    ) => {
      ctx.beginPath()

      ctx.moveTo(
        p1.x * canvas.width,
        p1.y * canvas.height
      )

      ctx.lineTo(
        p2.x * canvas.width,
        p2.y * canvas.height
      )

      ctx.strokeStyle = "#00d4ff"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    landmarks.forEach((point) => {
      drawPoint(
        point.x * canvas.width,
        point.y * canvas.height
      )
    })

    const connections = [
      [11, 12],

      [11, 13],
      [13, 15],

      [12, 14],
      [14, 16],

      [11, 23],
      [12, 24],

      [23, 24],

      [23, 25],
      [25, 27],

      [24, 26],
      [26, 28]
    ]

    connections.forEach(([a, b]) => {
      const p1 = landmarks[a]
      const p2 = landmarks[b]

      if (!p1 || !p2) return

      drawLine(p1, p2)
    })
  }, [landmarks])

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      className="
        absolute
        top-0
        left-0
        w-full
        h-full
        pointer-events-none
        z-50
      "
    />
  )
}