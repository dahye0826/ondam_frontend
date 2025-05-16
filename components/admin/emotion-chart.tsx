"use client"

import { useEffect, useRef } from "react"
import { emotionLabels } from "@/types"
import type { EmotionStatistics } from "@/types"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface EmotionChartProps {
  period: "daily" | "monthly"
  emotionStats: EmotionStatistics[]
}

export default function EmotionChart({ period, emotionStats }: EmotionChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 이전 차트 인스턴스 제거
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // 감정별 색상 설정
    const emotionColors = {
      happy: "rgba(255, 205, 86, 0.7)",
      sad: "rgba(54, 162, 235, 0.7)",
      angry: "rgba(255, 99, 132, 0.7)",
      anxious: "rgba(153, 102, 255, 0.7)",
      neutral: "rgba(201, 203, 207, 0.7)",
      excited: "rgba(255, 159, 64, 0.7)",
      tired: "rgba(75, 192, 192, 0.7)",
    }

    // 차트 데이터 준비
    const labels = Object.values(emotionLabels)
    const data = emotionStats.map((stat) => stat.count)
    const backgroundColors = emotionStats.map((stat) => emotionColors[stat.emotion])

    // 차트 생성
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: period === "daily" ? "일별 감정 통계" : "월별 감정 통계",
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) => color.replace("0.7", "1")),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y}회`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [period, emotionStats])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
