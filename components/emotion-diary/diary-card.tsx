"use client"

import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type EmotionDiary, emotionEmojis, emotionLabels } from "@/types"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { diaryService } from "@/lib/mock-service"
import { useRouter } from "next/navigation"

interface DiaryCardProps {
  diary: EmotionDiary
  onDelete?: (id: string) => void
  refreshData?: () => void
}

export default function DiaryCard({ diary, onDelete, refreshData }: DiaryCardProps) {
  const router = useRouter()
  const formattedDate = format(new Date(diary.createdAt), "yyyy년 MM월 dd일 EEEE", { locale: ko })

  // 감정별 색상 설정
  const getEmotionColors = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return { bg: "bg-yellow-50", text: "text-yellow-600" }
      case "sad":
        return { bg: "bg-blue-50", text: "text-blue-600" }
      case "angry":
        return { bg: "bg-red-50", text: "text-red-600" }
      case "anxious":
        return { bg: "bg-purple-50", text: "text-purple-600" }
      case "neutral":
        return { bg: "bg-gray-50", text: "text-gray-600" }
      case "excited":
        return { bg: "bg-orange-50", text: "text-orange-600" }
      case "tired":
        return { bg: "bg-teal-50", text: "text-teal-600" }
      default:
        return { bg: "bg-gray-50", text: "text-gray-600" }
    }
  }

  const colors = getEmotionColors(diary.emotion)

  const handleDelete = async () => {
    if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
      try {
        await diaryService.deleteDiary(diary.id)
        toast({
          title: "일기가 삭제되었습니다",
        })
        if (onDelete) {
          onDelete(diary.id)
        } else if (refreshData) {
          refreshData()
        } else {
          router.refresh()
        }
      } catch (error) {
        toast({
          title: "오류가 발생했습니다",
          description: "일기를 삭제하는 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card className={`border-gray-200 hover:border-gray-300 transition-colors ${colors.bg}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <span className="text-3xl mr-2">{emotionEmojis[diary.emotion]}</span>
          <span className={`font-medium ${colors.text}`}>{emotionLabels[diary.emotion]}</span>
        </div>
        <span className="text-sm text-[#8692A6]">{formattedDate}</span>
      </CardHeader>
      <CardContent>
        <p className="text-[#8692A6] line-clamp-3">{diary.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href={`/emotion-diary/edit/${diary.id}`}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">수정</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">삭제</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
