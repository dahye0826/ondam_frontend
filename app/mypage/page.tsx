"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DiaryCard from "@/components/emotion-diary/diary-card"
import ResultCard from "@/components/diagnosis/result-card"
import { diaryService, diagnosisService, userService } from "@/lib/mock-service"
import type { User, EmotionDiary, DiagnosisResult } from "@/types"
import { useRouter } from "next/navigation"

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [diaries, setDiaries] = useState<EmotionDiary[]>([])
  const [allResults, setAllResults] = useState<DiagnosisResult[]>([])
  const [filteredResults, setFilteredResults] = useState<DiagnosisResult[]>([])
  const [diagnosisType, setDiagnosisType] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("diaries")

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const userData = await userService.getCurrentUser()
      const diariesData = await diaryService.getUserDiaries(userData.id)
      const resultsData = await diagnosisService.getUserResults(userData.id)

      setUser(userData)
      setDiaries(diariesData)
      setAllResults(resultsData)
      setFilteredResults(resultsData)
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 진단 결과 필터링
  const handleFilterDiagnosisType = (type: string) => {
    if (type === "all") {
      setFilteredResults(allResults)
    } else {
      const filtered = allResults.filter((result) => result.type === type)
      setFilteredResults(filtered)
    }
    setDiagnosisType(type)
  }

  // 일기 삭제 후 목록 갱신
  const handleDiaryDelete = (id: string) => {
    setDiaries(diaries.filter((diary) => diary.id !== id))
  }

 // 회원정보 수정 페이지로 이동
const handleEditProfile = () => {
  router.push("/mypage/edit");
};

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">마이페이지</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }


  if (!user) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">마이페이지</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">사용자 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const formattedJoinDate = format(new Date(user.createdAt), "yyyy년 MM월 dd일", { locale: ko })

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">마이페이지</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2C73EB]">사용자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#8692A6]">이름</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#8692A6]">이메일</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-[#8692A6]">가입일</p>
                <p className="font-medium">{formattedJoinDate}</p>
              </div>
             <div className="pt-4 flex justify-end gap-4">
                <Button variant="outline" onClick={handleEditProfile}>
                  회원정보 수정
                </Button>
                <Button className="bg-[#2C73EB] hover:bg-[#2361c7]" onClick={() => router.push("/emotion-diary")}>
                  일기 작성하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="diaries">감정일기</TabsTrigger>
              <TabsTrigger value="diagnosis">자가진단 결과</TabsTrigger>
            </TabsList>
            <TabsContent value="diaries" className="mt-6">
              {diaries.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-[#8692A6] mb-4">작성한 일기가 없습니다.</p>
                  <Button asChild className="bg-[#2C73EB] hover:bg-[#2361c7]">
                    <Link href="/emotion-diary">일기 작성하기</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {diaries.map((diary) => (
                    <DiaryCard key={diary.id} diary={diary} onDelete={handleDiaryDelete} refreshData={fetchData} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="diagnosis" className="mt-6">
              <div className="mb-6">
                <Select value={diagnosisType} onValueChange={handleFilterDiagnosisType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="진단 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="PHQ-9">PHQ-9 (우울)</SelectItem>
                    <SelectItem value="GAD-7">GAD-7 (불안)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredResults.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-[#8692A6] mb-4">자가진단 결과가 없습니다.</p>
                  <Button asChild className="bg-[#2C73EB] hover:bg-[#2361c7]">
                    <Link href="/self-diagnosis">자가진단 시작하기</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((result) => (
                    <ResultCard key={result.id} result={result} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
