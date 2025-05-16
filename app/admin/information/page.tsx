"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import ContentForm from "@/components/admin/content-form"
import ContentTable from "@/components/admin/content-table"
import { informationService } from "@/lib/mock-service"
import type { InformationContent } from "@/types"

export default function InformationManagementPage() {
  const [contents, setContents] = useState<InformationContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<InformationContent | null>(null)
  const [activeTab, setActiveTab] = useState<"infoCard" | "recoveryContent">("infoCard")

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await informationService.getAllContents()
        setContents(data)
      } catch (error) {
        console.error("콘텐츠를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContents()
  }, [])

  const handleAddContent = () => {
    setEditingContent(null)
    setIsFormOpen(true)
  }

  const handleEditContent = (content: InformationContent) => {
    setEditingContent(content)
    setIsFormOpen(true)
  }

  const handleDeleteContent = async (id: string) => {
    if (window.confirm("정말로 이 콘텐츠를 삭제하시겠습니까?")) {
      try {
        await informationService.deleteContent(id)
        setContents(contents.filter((content) => content.id !== id))
      } catch (error) {
        console.error("콘텐츠 삭제 중 오류가 발생했습니다:", error)
      }
    }
  }

  const handleSaveContent = async (content: InformationContent) => {
    try {
      if (editingContent) {
        // 수정
        const updatedContent = await informationService.updateContent(content)
        setContents(contents.map((c) => (c.id === updatedContent.id ? updatedContent : c)))
      } else {
        // 추가
        const newContent = await informationService.createContent(content)
        setContents([...contents, newContent])
      }
      setIsFormOpen(false)
      setEditingContent(null)
    } catch (error) {
      console.error("콘텐츠 저장 중 오류가 발생했습니다:", error)
    }
  }

  const filteredContents = contents.filter((content) => content.type === activeTab)

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#2C73EB]">정보공간 관리</h1>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
            <a href="/admin">대시보드로 돌아가기</a>
          </Button>
          <Button onClick={handleAddContent} className="bg-[#2C73EB] hover:bg-[#2361c7]">
            <Plus className="h-4 w-4 mr-2" />
            콘텐츠 추가
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C73EB]">정보공간 콘텐츠 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "infoCard" | "recoveryContent")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="infoCard">정보카드 (PDF)</TabsTrigger>
              <TabsTrigger value="recoveryContent">회복 콘텐츠 (유튜브)</TabsTrigger>
            </TabsList>

            <TabsContent value="infoCard">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-[#8692A6]">데이터를 불러오는 중...</p>
                </div>
              ) : (
                <ContentTable
                  contents={filteredContents}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                  contentType="infoCard"
                />
              )}
            </TabsContent>

            <TabsContent value="recoveryContent">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-[#8692A6]">데이터를 불러오는 중...</p>
                </div>
              ) : (
                <ContentTable
                  contents={filteredContents}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                  contentType="recoveryContent"
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isFormOpen && (
        <ContentForm
          content={editingContent}
          contentType={activeTab}
          onSave={handleSaveContent}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingContent(null)
          }}
        />
      )}
    </div>
  )
}
