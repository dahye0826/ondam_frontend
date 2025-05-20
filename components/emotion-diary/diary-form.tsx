"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import EmotionSelector from "./emotion-selector"
import type { Emotion, EmotionDiary } from "@/types"
import { diaryService } from "@/lib/mock-service"
import { Mic, CircleStop } from "lucide-react"

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

  // 녹음 상태 관리
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" })

        // 👉 Whisper 서버 연동할 경우 아래 주석 해제
        /*
        const formData = new FormData()
        formData.append("audio", blob)

        const res = await fetch("http://localhost:8000/transcribe", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        setContent((prev) => prev + "\n" + data.transcription)
        */

        //  여기서는 재생만 (임시)
        const audioURL = URL.createObjectURL(blob)
        new Audio(audioURL).play()

        chunks.current = []
      }
    } catch (err) {
      toast({
        title: "마이크 접근 오류",
        description: "브라우저 마이크 권한을 허용해주세요.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

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
        toast({ title: "일기가 수정되었습니다" })
      } else {
        await diaryService.createDiary(userId, selectedEmotion, content)
        toast({ title: "일기가 저장되었습니다" })
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
        <div className="flex items-center justify-between">
          <label htmlFor="content" className="text-lg font-medium text-[#2C73EB]">
            오늘의 일기
          </label>
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-1 text-sm px-3 py-1 border rounded
              ${isRecording ? "text-red-500 border-red-500 hover:bg-red-50" : "text-[#2C73EB] border-[#2C73EB] hover:bg-[#e6edff]"}`}
          >
            {isRecording ? <CircleStop className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {isRecording ? "정지" : "녹음"}
          </button>
        </div>

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