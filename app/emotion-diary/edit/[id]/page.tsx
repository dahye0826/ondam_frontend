"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import DiaryForm from "@/components/emotion-diary/diary-form"
import { diaryService, userService } from "@/lib/mock-service"
import type { EmotionDiary } from "@/types"

export default function EditDiaryPage() {
  const params = useParams()
  const router = useRouter()
  const diaryId = params.id as string

  const [diary, setDiary] = useState<EmotionDiary | null>(null)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getCurrentUser()
        setUser(userData)

        // 일기 데이터 가져오기
        const diaryData = await diaryService.getDiaryById(diaryId)

        // 권한 확인 (자신의 일기만 수정 가능)
        if (diaryData.userId !== userData.id) {
          setError("권한이 없습니다.")
          toast({
            title: "권한이 없습니다",
            description: "자신이 작성한 일기만 수정할 수 있습니다.",
            variant: "destructive",
          })
          router.push("/mypage")
          return
        }

        setDiary(diaryData)
      } catch (err) {
        console.error("일기를 불러오는 중 오류가 발생했습니다:", err)
        setError("일기를 불러오는 중 오류가 발생했습니다.")
        toast({
          title: "오류가 발생했습니다",
          description: "일기를 불러오는 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [diaryId, router])

  const handleSuccess = () => {
    toast({
      title: "일기가 수정되었습니다",
    })
    router.push("/mypage")
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">일기 수정</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">일기를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !diary || !user) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">일기 수정</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">{error || "일기를 찾을 수 없습니다."}</p>
          <Button onClick={() => router.push("/mypage")} className="mt-4 bg-[#2C73EB] hover:bg-[#2361c7]">
            마이페이지로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">일기 수정</h1>
      <DiaryForm diary={diary} userId={user.id} onSuccess={handleSuccess} />
    </div>
  )
}
