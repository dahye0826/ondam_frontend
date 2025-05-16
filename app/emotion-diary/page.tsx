import DiaryForm from "@/components/emotion-diary/diary-form"
import { diaryService, userService } from "@/lib/mock-service"

export default async function EmotionDiaryPage() {
  // 실제 구현에서는 서버 컴포넌트에서 세션/쿠키를 통해 사용자 정보를 가져옵니다
  const user = await userService.getCurrentUser()
  const hasTodayDiary = await diaryService.hasTodayDiary(user.id)

  // 이미 오늘 일기를 작성했다면 마이페이지로 리다이렉트
  if (hasTodayDiary) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">오늘의 감정일기</h1>
        <div className="bg-[#2C73EB]/10 p-6 rounded-lg text-center">
          <p className="text-[#2C73EB] mb-4">오늘의 일기를 이미 작성하셨습니다.</p>
          <p className="text-[#8692A6]">내일 다시 방문해주세요. 작성한 일기는 마이페이지에서 확인할 수 있습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">오늘의 감정일기 작성</h1>
      <DiaryForm userId={user.id} />
    </div>
  )
}
