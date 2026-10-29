

import { PoseLandmarkerResult } from "@mediapipe/tasks-vision"

interface Point {
  x: number
  y: number
}

function midpoint(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  }
}

function vector(a: Point, b: Point): Point {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

function magnitude(v: Point): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

function dot(u: Point, v: Point): number {
  return u.x * v.x + u.y * v.y
}

function angleBetween(u: Point, v: Point): number {
  const magU = magnitude(u)
  const magV = magnitude(v)

  if (magU === 0 || magV === 0) return 0

  const cosTheta = dot(u, v) / (magU * magV)

  const clamped = Math.min(1, Math.max(-1, cosTheta))

  return (Math.acos(clamped) * 180) / Math.PI
}

export function calculateMetrics(result: PoseLandmarkerResult) {
  const landmarks = result.landmarks[0]

  if (!landmarks) return null

  const leftShoulder = landmarks[11]
  const rightShoulder = landmarks[12]
  const leftHip = landmarks[23]
  const rightHip = landmarks[24]
  const leftEar = landmarks[7]
  const rightEar = landmarks[8]

  if (
    !leftShoulder || !rightShoulder ||
    !leftHip || !rightHip ||
    !leftEar || !rightEar
  ) {
    return null
  }

  const shoulderMid = midpoint(leftShoulder, rightShoulder)
  const hipMid = midpoint(leftHip, rightHip)
  const earMid = midpoint(leftEar, rightEar)

  const verticalAxis = { x: 0, y: -1 }
  const horizontalAxis = { x: 1, y: 0 }

  // Neck angle
  const neckVector = vector(shoulderMid, earMid)
  const neckAngle = angleBetween(neckVector, verticalAxis)

  // Lumbar angle
  const spineVector = vector(hipMid, shoulderMid)
  const lumbarAngle = angleBetween(spineVector, verticalAxis)

  // Shoulder tilt
  const shoulderVector = vector(leftShoulder, rightShoulder)
  let shoulderTilt = angleBetween(shoulderVector, horizontalAxis)

  if (shoulderTilt > 90) {
    shoulderTilt = 180 - shoulderTilt
  }

  return {
    neck_angle_deg: neckAngle,
    lumbar_angle_deg: lumbarAngle,
    shoulder_tilt_deg: shoulderTilt
  }
}