"use client"

import WebcamPanel from "@/components/dashboard/WebcamPanel"
import { usePostureStore } from "@/hooks/usePostureStore"

export default function Home() {
  const metrics = usePostureStore((state) => state.currentMetrics)

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">PostureAI</h1>

      <div className="grid grid-cols-2 gap-8">
        <WebcamPanel />

        <div className="space-y-4">
          <MetricCard label="Neck Angle" value={metrics?.neck_angle_deg} />
          <MetricCard label="Lumbar Angle" value={metrics?.lumbar_angle_deg} />
          <MetricCard label="Shoulder Tilt" value={metrics?.shoulder_tilt_deg} />
          <MetricCard label="Posture Score" value={metrics?.posture_score} />
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value
}: {
  label: string
  value: number | undefined
}) {
  return (
    <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-2xl font-semibold">
        {value ? value.toFixed(2) : "--"}
      </div>
    </div>
  )
}