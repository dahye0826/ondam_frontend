"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { adminService } from "@/lib/mock-service"
import { Users, ClipboardCheck, Calendar } from "lucide-react"
import EmotionChart from "@/components/admin/emotion-chart"
import type { AdminStatistics } from "@/types"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartPeriod, setChartPeriod] = useState<"daily" | "monthly">("daily")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStatistics()
        setStats(data)
      } catch (error) {
        console.error("통계 데이터를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">관리자 대시보드</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">관리자 대시보드</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">통계 데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#2C73EB]">관리자 대시보드</h1>
        <Button asChild className="bg-[#2C73EB] hover:bg-[#2361c7]">
          <Link href="/admin/information">정보공간 관리</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8692A6]">총 회원 수</CardTitle>
            <Users className="h-4 w-4 text-[#2C73EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C73EB]">{stats.userCount}명</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8692A6]">감정일기 수</CardTitle>
            <Calendar className="h-4 w-4 text-[#2C73EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C73EB]">{stats.diaryCount}개</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8692A6]">PHQ-9 응시 수</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-[#2C73EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C73EB]">{stats.diagnosisCount.phq9}회</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8692A6]">GAD-7 응시 수</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-[#2C73EB]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C73EB]">{stats.diagnosisCount.gad7}회</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#2C73EB]">감정 통계</CardTitle>
            <Tabs value={chartPeriod} onValueChange={(value) => setChartPeriod(value as "daily" | "monthly")}>
              <TabsList>
                <TabsTrigger value="daily">일별</TabsTrigger>
                <TabsTrigger value="monthly">월별</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <EmotionChart period={chartPeriod} emotionStats={stats.emotionStats} />
        </CardContent>
      </Card>
    </div>
  )
}
