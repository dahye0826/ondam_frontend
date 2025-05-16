"use client"
import { type Emotion, emotionEmojis, emotionLabels } from "@/types"
import { cn } from "@/lib/utils"

interface EmotionSelectorProps {
  selectedEmotion: Emotion | null
  onSelect: (emotion: Emotion) => void
}

export default function EmotionSelector({ selectedEmotion, onSelect }: EmotionSelectorProps) {
  const emotions: Emotion[] = ["happy", "sad", "angry", "anxious", "neutral", "excited", "tired"]

  // 감정별 색상 설정
  const getEmotionColors = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-600" }
      case "sad":
        return { bg: "bg-blue-100", border: "border-blue-400", text: "text-blue-600" }
      case "angry":
        return { bg: "bg-red-100", border: "border-red-400", text: "text-red-600" }
      case "anxious":
        return { bg: "bg-purple-100", border: "border-purple-400", text: "text-purple-600" }
      case "neutral":
        return { bg: "bg-gray-100", border: "border-gray-400", text: "text-gray-600" }
      case "excited":
        return { bg: "bg-orange-100", border: "border-orange-400", text: "text-orange-600" }
      case "tired":
        return { bg: "bg-teal-100", border: "border-teal-400", text: "text-teal-600" }
      default:
        return { bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-600" }
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#2C73EB]">오늘의 감정을 선택해주세요</h3>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-4 justify-center">
        {emotions.map((emotion) => {
          const colors = getEmotionColors(emotion)
          return (
            <button
              key={emotion}
              type="button" // 폼 제출을 방지하기 위해 type="button"으로 설정
              onClick={() => onSelect(emotion)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
                selectedEmotion === emotion
                  ? `${colors.bg} ${colors.border} ${colors.text}`
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
              )}
            >
              <span className="text-3xl mb-2">{emotionEmojis[emotion]}</span>
              <span className={cn("text-sm", selectedEmotion === emotion ? colors.text : "text-gray-600")}>
                {emotionLabels[emotion]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
