"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import EmotionSelector from "./emotion-selector"
import type { Emotion, EmotionDiary } from "@/types"
import { diaryService } from "@/lib/mock-service"

interface DiaryFormProps {
  diary?: EmotionDiary
  userId: string
  onSuccess?: () => void
}

export default function DiaryForm({ diary, userId, onSuccess }: DiaryFormProps) {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(diary?.emotion || null)
  const [content, setContent] = useState(diary?.content || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ emotion?: string; content?: string }>({})

  const isEditing = !!diary

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion)
    setErrors((prev) => ({ ...prev, emotion: undefined }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, content: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사 - 오류 메시지를 내부적으로 관리
    let hasError = false
    const newErrors = { ...errors }

    if (!selectedEmotion) {
      newErrors.emotion = "감정을 선택해주세요"
      hasError = true
    }

    if (!content.trim()) {
      newErrors.content = "일기 내용을 입력해주세요"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditing && diary) {
        await diaryService.updateDiary(diary.id, selectedEmotion, content)
        toast({
          title: "일기가 수정되었습니다",
        })
      } else {
        await diaryService.createDiary(userId, selectedEmotion, content)
        toast({
          title: "일기가 저장되었습니다",
        })
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/mypage")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <EmotionSelector selectedEmotion={selectedEmotion} onSelect={handleEmotionSelect} />
        {errors.emotion && <p className="text-red-500 text-sm mt-1">{errors.emotion}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-lg font-medium text-[#2C73EB]">
          오늘의 일기
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="오늘 하루 어떠셨나요? 감정과 관련된 경험이나 생각을 자유롭게 적어보세요."
          className="min-h-[200px] border-gray-200 focus-visible:ring-[#2C73EB]"
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-[#8692A6] text-[#8692A6]"
        >
          취소
        </Button>
        <Button type="submit" className="bg-[#2C73EB] hover:bg-[#2361c7]" disabled={isSubmitting}>
          {isEditing ? "수정하기" : "저장하기"}
        </Button>
      </div>
    </form>
  )
}
