"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { emotionEmojis, emotionLabels, type EmotionDiary, type Emotion } from "@/types"

interface EmotionStatsProps {
  diaries: EmotionDiary[]
}

export default function EmotionStats({ diaries }: EmotionStatsProps) {
  // 감정별 통계 계산
  const emotionCounts: Record<string, number> = {}
  diaries.forEach((diary) => {
    emotionCounts[diary.emotion] = (emotionCounts[diary.emotion] || 0) + 1
  })

  // 감정별 색상 설정
  const getEmotionColors = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return { bg: "bg-yellow-100", text: "text-yellow-600" }
      case "sad":
        return { bg: "bg-blue-100", text: "text-blue-600" }
      case "angry":
        return { bg: "bg-red-100", text: "text-red-600" }
      case "anxious":
        return { bg: "bg-purple-100", text: "text-purple-600" }
      case "neutral":
        return { bg: "bg-gray-100", text: "text-gray-600" }
      case "excited":
        return { bg: "bg-orange-100", text: "text-orange-600" }
      case "tired":
        return { bg: "bg-teal-100", text: "text-teal-600" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" }
    }
  }

  // 가장 많은 감정 찾기
  let mostFrequentEmotion: Emotion | null = null
  let maxCount = 0

  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      mostFrequentEmotion = emotion as Emotion
      maxCount = count
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2C73EB]">감정 통계</CardTitle>
      </CardHeader>
      <CardContent>
        {diaries.length === 0 ? (
          <p className="text-[#8692A6] text-center py-4">작성한 일기가 없습니다.</p>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#8692A6] mb-2">가장 많이 느낀 감정</p>
              {mostFrequentEmotion && (
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{emotionEmojis[mostFrequentEmotion]}</span>
                  <span className={`font-medium ${getEmotionColors(mostFrequentEmotion).text}`}>
                    {emotionLabels[mostFrequentEmotion]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-[#8692A6] mb-2">감정별 분포</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Object.entries(emotionCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([emotion, count]) => {
                    const emotionKey = emotion as Emotion
                    const colors = getEmotionColors(emotionKey)
                    return (
                      <div key={emotion} className={`p-3 rounded-lg ${colors.bg}`}>
                        <div className="flex items-center mb-1">
                          <span className="text-2xl mr-2">{emotionEmojis[emotionKey]}</span>
                          <span className={`text-sm font-medium ${colors.text}`}>{emotionLabels[emotionKey]}</span>
                        </div>
                        <p className={`text-xs ${colors.text}`}>{count}회</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
